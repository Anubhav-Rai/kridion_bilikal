import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { formatPrice, getLineItemId, getProductId, getStock } from '../../utils/product';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, isWishlisted, addToCart, updateCartQuantity, removeFromCart, toggleWishlist } =
    useStore();

  const productId = getProductId(product);
  const stock = getStock(product);
  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 5;
  const wished = isWishlisted(productId);

  const cartItem = cart.find((item) => getLineItemId(item) === productId);
  const cartQuantity = cartItem?.quantity ?? 0;
  const inCart = cartQuantity > 0;

  const handleWishlist = () => (user ? toggleWishlist(productId) : navigate('/login'));
  const handleAdd = () => {
    if (!user) return navigate('/login');
    if (inStock) addToCart(productId);
  };
  const handleDecrease = () =>
    cartQuantity > 1 ? updateCartQuantity(productId, cartQuantity - 1) : removeFromCart(productId);
  const handleIncrease = () => cartQuantity < stock && updateCartQuantity(productId, cartQuantity + 1);

  const stockLabel = !inStock ? 'Sold out' : lowStock ? `Only ${stock} left` : 'In stock';

  return (
    <div className="group flex flex-col">
      {/* Image tile */}
      <div className="relative">
        <div className="grid aspect-square place-items-center bg-sub">
          <span className={`text-5xl ${inStock ? '' : 'opacity-40'}`}>{product.image}</span>
        </div>
        {user && (
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className="absolute right-2 top-2 p-1.5"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              fill={wished ? 'currentColor' : 'none'}
              className={wished ? 'text-accent' : 'text-muted transition-colors hover:text-ink'}
            />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm leading-snug text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-ink">{formatPrice(product.price)}</p>
        <p className={`mt-1 text-xs ${lowStock ? 'text-accent' : 'text-muted'}`}>{stockLabel}</p>

        <div className="mt-3">
          {!inCart ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={!inStock}
              className="btn btn-outline w-full px-3 py-2 text-xs"
            >
              {inStock ? 'Add to Cart' : 'Sold out'}
            </button>
          ) : (
            <div className="flex items-center justify-between border border-line">
              <button
                type="button"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
                className="px-3 py-2 text-muted transition-colors hover:text-ink"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm tabular-nums text-ink">{cartQuantity}</span>
              <button
                type="button"
                onClick={handleIncrease}
                disabled={cartQuantity >= stock}
                aria-label="Increase quantity"
                className="px-3 py-2 text-muted transition-colors hover:text-ink disabled:text-line disabled:hover:text-line"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
