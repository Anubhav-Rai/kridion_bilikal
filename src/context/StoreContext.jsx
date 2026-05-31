import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { cartApi, ordersApi, productsApi, wishlistApi } from '../api';
import {
  findProduct,
  getLineItemId,
  getProductId,
  getStock,
  indexProducts,
} from '../utils/product';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const StoreContext = createContext(null);

const initialState = {
  products: [],
  productsLoading: true,
  cart: [],
  wishlist: [], // array of product id strings
  orders: [],
};

const asArray = (value) => (Array.isArray(value) ? value : []);
const normalizeWishlist = (w) => asArray(w?.productIds).map(String);
const normalizeOrders = (data) =>
  asArray(data).map((order) => ({ ...order, items: asArray(order.items) }));

function reducer(state, action) {
  switch (action.type) {
    case 'PRODUCTS_LOADING':
      return { ...state, productsLoading: true };
    case 'SET_PRODUCTS':
      return { ...state, products: asArray(action.products), productsLoading: false };
    case 'SET_CART':
      return { ...state, cart: asArray(action.cart) };
    case 'SET_WISHLIST':
      return { ...state, wishlist: asArray(action.wishlist) };
    case 'SET_ORDERS':
      return { ...state, orders: asArray(action.orders) };
    case 'RESET_USER_DATA':
      return { ...state, cart: [], wishlist: [], orders: [] };
    case 'DEDUCT_STOCK':
      return {
        ...state,
        products: state.products.map((p) => {
          const qty = action.deductions[getProductId(p)];
          return qty ? { ...p, stock: Math.max(0, getStock(p) - qty) } : p;
        }),
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const { user } = useAuth();
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initialState);

  // --- Loaders ---------------------------------------------------------------
  const refreshProducts = useCallback(async () => {
    try {
      const data = await productsApi.list();
      dispatch({ type: 'SET_PRODUCTS', products: data });
    } catch {
      dispatch({ type: 'SET_PRODUCTS', products: [] });
    }
  }, []);

  const refreshOrders = useCallback(async () => {
    try {
      const data = await ordersApi.list();
      dispatch({ type: 'SET_ORDERS', orders: normalizeOrders(data) });
    } catch {
      /* keep existing orders on transient failure */
    }
  }, []);

  // Fetch the catalogue once on mount.
  useEffect(() => {
    let ignore = false;
    dispatch({ type: 'PRODUCTS_LOADING' });
    productsApi
      .list()
      .then((data) => {
        if (!ignore) dispatch({ type: 'SET_PRODUCTS', products: data });
      })
      .catch(() => {
        if (!ignore) dispatch({ type: 'SET_PRODUCTS', products: [] });
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Load (or clear) per-user data whenever the signed-in user changes.
  useEffect(() => {
    if (!user) {
      dispatch({ type: 'RESET_USER_DATA' });
      return undefined;
    }
    let ignore = false;
    Promise.allSettled([cartApi.get(), wishlistApi.get(), ordersApi.list()]).then(
      ([cart, wishlist, orders]) => {
        if (ignore) return;
        if (cart.status === 'fulfilled')
          dispatch({ type: 'SET_CART', cart: cart.value?.items });
        if (wishlist.status === 'fulfilled')
          dispatch({ type: 'SET_WISHLIST', wishlist: normalizeWishlist(wishlist.value) });
        if (orders.status === 'fulfilled')
          dispatch({ type: 'SET_ORDERS', orders: normalizeOrders(orders.value) });
      },
    );
    return () => {
      ignore = true;
    };
  }, [user]);

  // --- Cart actions ----------------------------------------------------------
  const removeFromCart = useCallback(
    async (productId) => {
      try {
        const cart = await cartApi.remove(String(productId));
        dispatch({ type: 'SET_CART', cart: cart?.items });
      } catch (err) {
        toast.error(err.message || 'Failed to remove item');
      }
    },
    [toast],
  );

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      const id = String(productId);
      const product = findProduct(state.products, id);
      const stock = getStock(product);
      const existing = state.cart.find((item) => getLineItemId(item) === id);
      const inCart = existing ? existing.quantity : 0;

      if (stock <= 0) {
        toast.error('This product is out of stock');
        return;
      }
      if (inCart + quantity > stock) {
        toast.error(`Only ${stock} available — you already have ${inCart} in your cart.`);
        return;
      }
      try {
        const cart = await cartApi.add(id, quantity);
        dispatch({ type: 'SET_CART', cart: cart?.items });
        toast.success('Added to cart');
      } catch (err) {
        toast.error(err.message || 'Failed to add to cart');
      }
    },
    [state.products, state.cart, toast],
  );

  const updateCartQuantity = useCallback(
    async (productId, quantity) => {
      const id = String(productId);
      if (quantity <= 0) {
        await removeFromCart(id);
        return;
      }
      const stock = getStock(findProduct(state.products, id));
      if (quantity > stock) {
        toast.error(`Only ${stock} items available in stock`);
        return;
      }
      try {
        const cart = await cartApi.update(id, quantity);
        dispatch({ type: 'SET_CART', cart: cart?.items });
      } catch (err) {
        toast.error(err.message || 'Failed to update quantity');
      }
    },
    [state.products, toast, removeFromCart],
  );

  // --- Wishlist action -------------------------------------------------------
  const toggleWishlist = useCallback(
    async (productId) => {
      const id = String(productId);
      const isWishlisted = state.wishlist.includes(id);
      // Optimistic next state, reconciled with the server response if present.
      const optimistic = isWishlisted
        ? state.wishlist.filter((x) => x !== id)
        : [...state.wishlist, id];
      try {
        const w = isWishlisted ? await wishlistApi.remove(id) : await wishlistApi.add(id);
        const fromServer = Array.isArray(w?.productIds) ? normalizeWishlist(w) : null;
        dispatch({ type: 'SET_WISHLIST', wishlist: fromServer ?? optimistic });
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
      } catch (err) {
        toast.error(err.message || 'Failed to update wishlist');
      }
    },
    [state.wishlist, toast],
  );

  // --- Checkout --------------------------------------------------------------
  const placeOrder = useCallback(
    async (addressString) => {
      if (state.cart.length === 0) {
        toast.error('Your cart is empty');
        return false;
      }

      const shortages = [];
      for (const item of state.cart) {
        const id = getLineItemId(item);
        const product = findProduct(state.products, id);
        const stock = getStock(product);
        if (stock < item.quantity) {
          shortages.push(
            `${product?.name ?? `Product ${id}`}: requested ${item.quantity}, only ${stock} available`,
          );
        }
      }
      if (shortages.length) {
        toast.error(`Insufficient stock:\n${shortages.join('\n')}`);
        return false;
      }

      const items = state.cart.map((item) => ({
        productId: getLineItemId(item),
        quantity: item.quantity,
      }));

      try {
        const res = await ordersApi.place({ address: addressString, items });
        const deductions = {};
        for (const item of state.cart) deductions[getLineItemId(item)] = item.quantity;
        dispatch({ type: 'DEDUCT_STOCK', deductions });
        dispatch({ type: 'SET_CART', cart: [] });
        if (res?.order) {
          dispatch({ type: 'SET_ORDERS', orders: normalizeOrders([res.order, ...state.orders]) });
        }
        refreshOrders();
        refreshProducts();
        toast.success('Order placed successfully!');
        return true;
      } catch (err) {
        if (err.status === 409) {
          toast.error(
            'Some items are no longer available in the requested quantity. Please refresh and try again.',
          );
        } else {
          toast.error(err.message || 'Order failed. Please try again.');
        }
        return false;
      }
    },
    [state.cart, state.products, state.orders, toast, refreshOrders, refreshProducts],
  );

  // --- Derived selectors -----------------------------------------------------
  const productIndex = useMemo(() => indexProducts(state.products), [state.products]);

  const cartCount = useMemo(
    () => state.cart.reduce((n, item) => n + item.quantity, 0),
    [state.cart],
  );

  const cartTotal = useMemo(
    () =>
      state.cart.reduce((sum, item) => {
        const product = productIndex.get(getLineItemId(item));
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [state.cart, productIndex],
  );

  // Robust wishlist resolution — handles `_id` documents (the old bug) and any
  // wishlisted ids whose product is missing from the current catalogue.
  const wishlistProducts = useMemo(
    () => state.products.filter((p) => state.wishlist.includes(getProductId(p))),
    [state.products, state.wishlist],
  );

  const isWishlisted = useCallback(
    (productId) => state.wishlist.includes(String(productId)),
    [state.wishlist],
  );

  const value = useMemo(
    () => ({
      ...state,
      productIndex,
      cartCount,
      cartTotal,
      wishlistProducts,
      isWishlisted,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleWishlist,
      placeOrder,
      refreshProducts,
    }),
    [
      state,
      productIndex,
      cartCount,
      cartTotal,
      wishlistProducts,
      isWishlisted,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleWishlist,
      placeOrder,
      refreshProducts,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
};
