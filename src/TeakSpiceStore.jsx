import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductCard from './components/ProductCard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CartView from './components/CartView';
import OrdersView from './components/OrdersView';
import WishlistView from './components/WishlistView';
import ProfileView from './components/ProfileView';
import CompanyInfo from './components/CompanyInfo';

const normalizeOrders = (data) => {
  return Array.isArray(data) ? data.map(order => ({
    ...order,
    userId: order.userid || order.userId,
    items: Array.isArray(order.items) ? order.items.map(item => ({
      ...item,
      productId: item.productid || item.productId,
    })) : [],
  })) : [];
};


const TeakSpiceStore = () => {
  // App state
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState([]); // always an array!
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // JWT Helper
  const getToken = () => localStorage.getItem('token');
  const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

  // Fetch products on mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  // Try auto-login on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, { headers: authHeader() })
        .then(res => res.ok ? res.json() : null)
        .then(u => { if (u) setUser(u); })
        .catch(() => {});
    }
  }, []);

  // Fetch user-specific data after login
  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
        .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, { headers: authHeader() })
        .then(res => res.json()).then(data => setWishlist(Array.isArray(data.productIds) ? data.productIds : []));
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, { headers: authHeader() })
        .then(res => res.json()).then(data => setOrders(normalizeOrders(data)));
    } else {
      setCart([]); setWishlist([]); setOrders([]);
    }
  }, [user]);

  // --- Auth Handlers (REAL) ---
  const handleLogin = async (email, password) => {
    if (!email || !password) return alert('Please fill all fields');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        alert('Login failed');
        setLoading(false);
        return;
      }
      const result = await res.json();
      setUser(result.user);
      localStorage.setItem('token', result.token);
      setCurrentView('home');
    } catch (e) {
      alert('Login error');
    }
    setLoading(false);
  };

  const handleRegister = async ({ name, email, phone, password }) => {
    if (!name || !email || !phone || !password) return alert('Please fill all fields');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      if (!res.ok) {
        alert('Registration failed');
        setLoading(false);
        return;
      }
      // Auto-login after register
      await handleLogin(email, password);
    } catch (e) {
      alert('Registration error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setWishlist([]);
    localStorage.removeItem('token');
    setCurrentView('home');
  };

  // --- Cart Handlers ---
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    // Refresh cart
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
      .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
  };

  const removeFromCart = async (productId) => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
      method: 'DELETE',
      headers: authHeader()
    });
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
      .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    });
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
      .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const prod = products.find(
        p => (p.id === item.productId || p._id === item.productId || p._id === item.id)
      );
      return total + (prod ? prod.price * item.quantity : 0);
    }, 0);
  };

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  // --- Wishlist Handlers ---
  const toggleWishlist = async (productId) => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    if (wishlist.includes(productId)) {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${productId}`, { method: 'DELETE', headers: authHeader() });
    } else {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, { headers: authHeader() })
      .then(res => res.json()).then(data => setWishlist(Array.isArray(data.productIds) ? data.productIds : []));
  };

  // --- Order Handler ---
  const placeOrder = async () => {
    if (!address) return alert('Please enter delivery address');
    const orderItems = cart.map(item => ({
      productId: item.productId || item.id,
      quantity: item.quantity
    }));
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, items: orderItems })
    });
    if (!res.ok) {
      alert('Order failed');
      return;
    }
    // Refresh orders and cart
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, { headers: authHeader() })
      .then(res => res.json()).then(data => setOrders(normalizeOrders(data)));
    setCart([]);
    setAddress('');
    alert('Order placed successfully!');
    setCurrentView('orders');
  };

  // --- Navigation handler ---
  const handleNav = (view) => setCurrentView(view);

  // --- Rendering ---
  console.log("TeakSpiceStore: orders state", orders);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        <Header
          user={user}
          cartCount={getCartCount()}
          onLogout={handleLogout}
          onNav={handleNav}
          onLogin={() => setCurrentView('login')}
          onRegister={() => setCurrentView('register')}
        />
        <Navigation user={user} currentView={currentView} onNav={handleNav} />
        <main>
          {currentView === 'home' && (
            <>
              <CompanyInfo />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.isArray(products) && products.length > 0 ? (
                  products.map(product => (
                    <ProductCard
                      key={product.id || product._id}
                      product={product}
                      user={user}
                      wishlist={wishlist}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-700 py-8">No products available.</div>
                )}
              </div>
            </>
          )}

          {currentView === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
              loading={loading}
            />
          )}
          {currentView === 'register' && (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
              loading={loading}
            />
          )}
          {currentView === 'cart' && (
            <CartView
              cart={cart}
              user={user}
              address={address}
              onUpdateAddress={setAddress}
              onPlaceOrder={placeOrder}
              onNav={handleNav}
              onUpdateQuantity={updateCartQuantity}
              onRemoveFromCart={removeFromCart}
              getCartTotal={getCartTotal}
              products={products}
            />
          )}
          {currentView === 'orders' && user && <OrdersView orders={orders} products={products} />}
          {currentView === 'wishlist' && user && (
            <WishlistView
              products={products}
              wishlist={wishlist}
              user={user}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          )}
          {currentView === 'profile' && user && <ProfileView user={user} />}
        </main>
      </div>
    </div>
  );
};

export default TeakSpiceStore;
