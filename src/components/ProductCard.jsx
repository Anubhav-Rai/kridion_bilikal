import React from 'react';
import { Heart, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, user, wishlist, cart, onAddToCart, onToggleWishlist, onUpdateQuantity, onRemoveFromCart, darkMode }) => {
  // Check stock availability
  const stock = product.stock || 0;
  const isInStock = stock > 0;
  const isLowStock = stock > 0 && stock <= 5;
  
  // Get the correct product ID (API uses _id, local data uses id)
  const productId = product._id || product.id;
  
  // Check if product is in cart and get quantity
  const cartItem = cart?.find(item => 
    String(item.productId) === String(productId) ||
    String(item.id) === String(productId)
  );
  const cartQuantity = cartItem?.quantity || 0;
  const isInCart = cartQuantity > 0;
  
  return (
  <div className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 cursor-pointer ${
    darkMode 
      ? 'bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40' 
      : 'bg-gradient-to-br from-black/5 to-black/10 backdrop-blur-xl border border-black/20 hover:border-black/40'
  }`}>
    {/* Product Image Section */}
    <div className="relative h-80 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
        darkMode 
          ? 'from-emerald-900/20 via-transparent to-teal-900/20' 
          : 'from-emerald-100/50 via-transparent to-teal-100/50'
      }`}></div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-8xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-6">
          {product.image}
        </div>
      </div>

      {/* Wishlist Button */}
      {user && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(productId);
          }} 
          className={`absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl transition-all duration-500 hover:scale-110 flex items-center justify-center ${
            wishlist.includes(productId) 
              ? 'bg-rose-500/80 text-white shadow-2xl shadow-rose-500/30' 
              : darkMode 
                ? 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                : 'bg-black/10 text-black/60 hover:bg-black/20 hover:text-black'
          }`}
        >
          <Heart size={20} fill={wishlist.includes(productId) ? 'currentColor' : 'none'} />
        </button>
      )}

      {/* Stock Badge */}
      <div className={`absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-xl border text-sm font-bold transition-all duration-500 ${
        !isInStock 
          ? darkMode 
            ? 'bg-red-500/20 border-red-400/30 text-red-400' 
            : 'bg-red-500/20 border-red-500/30 text-red-600'
          : isLowStock 
            ? darkMode 
              ? 'bg-orange-500/20 border-orange-400/30 text-orange-400' 
              : 'bg-orange-500/20 border-orange-500/30 text-orange-600'
            : darkMode 
              ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-400' 
              : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-600'
      }`}>
        {!isInStock ? 'Out of Stock' : isLowStock ? `Only ${stock} left` : 'In Stock'}
      </div>
    </div>
    
    {/* Product Info */}
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <h3 className={`font-black text-xl leading-tight transition-all duration-300 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          {product.name}
        </h3>
        
        <p className={`text-base leading-relaxed transition-colors duration-300 ${
          darkMode ? 'text-white/60' : 'text-black/60'
        }`}>
          {product.description}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              ₹{product.price.toLocaleString()}
            </span>
            <p className={`text-sm font-medium ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              per unit
            </p>
          </div>
        </div>
      
        {/* Action Button */}
        {!isInCart ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              isInStock && onAddToCart(productId);
            }}
            disabled={!isInStock}
            className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all duration-500 hover:scale-105 active:scale-95 ${
              !isInStock
                ? darkMode
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-black/10 text-black/30 cursor-not-allowed'
                : darkMode 
                  ? 'bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/20' 
                  : 'bg-black text-white hover:bg-black/90 shadow-2xl shadow-black/20'
            }`}
          >
            {!isInStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        ) : (
          <div className={`flex items-center justify-between rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
            darkMode 
              ? 'bg-white/10 border-white/20' 
              : 'bg-black/10 border-black/20'
          }`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                cartQuantity > 1 ? onUpdateQuantity(productId, cartQuantity - 1) : onRemoveFromCart(productId);
              }}
              className={`p-4 rounded-l-2xl transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'text-white/60 hover:text-white hover:bg-white/10' 
                  : 'text-black/60 hover:text-black hover:bg-black/10'
              }`}
            >
              <Minus size={20} />
            </button>
            
            <div className="px-6 py-4 text-center">
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {cartQuantity}
              </span>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                cartQuantity < stock && onUpdateQuantity(productId, cartQuantity + 1);
              }}
              disabled={cartQuantity >= stock}
              className={`p-4 rounded-r-2xl transition-all duration-300 hover:scale-110 ${
                cartQuantity >= stock
                  ? darkMode 
                    ? 'text-white/20 cursor-not-allowed' 
                    : 'text-black/20 cursor-not-allowed'
                  : darkMode 
                    ? 'text-white/60 hover:text-white hover:bg-white/10' 
                    : 'text-black/60 hover:text-black hover:bg-black/10'
              }`}
            >
              <Plus size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default ProductCard;
