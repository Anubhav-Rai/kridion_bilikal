import React from 'react';
import { Heart, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, user, wishlist, cart, onAddToCart, onToggleWishlist, onUpdateQuantity, onRemoveFromCart, darkMode }) => {
  // Check stock availability
  const stock = product.stock || 0;
  const isInStock = stock > 0;
  const isLowStock = stock > 0 && stock <= 5;
  
  // Check if product is in cart and get quantity
  const cartItem = cart?.find(item => 
    String(item.productId) === String(product.id) || 
    String(item.productId) === String(product._id) ||
    String(item.id) === String(product.id) || 
    String(item.id) === String(product._id)
  );
  const cartQuantity = cartItem?.quantity || 0;
  const isInCart = cartQuantity > 0;
  
  return (
  <div className={`group rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 ${
    darkMode 
      ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
      : 'bg-white border-slate-200 hover:border-slate-300'
  }`}>
    {/* Product Image */}
    <div className={`relative h-48 flex items-center justify-center transition-colors duration-300 ${
      darkMode ? 'bg-slate-700' : 'bg-slate-50'
    }`}>
      <div className="text-4xl filter drop-shadow-sm">
        {product.image}
      </div>
      {user && (
        <button 
          onClick={() => onToggleWishlist(product.id)} 
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
            wishlist.includes(product.id) 
              ? 'bg-rose-500 text-white shadow-md' 
              : darkMode 
                ? 'bg-slate-800 text-slate-400 hover:bg-rose-900 hover:text-rose-400 shadow-sm border border-slate-600'
                : 'bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-500 shadow-sm border border-slate-200'
          }`}
        >
          <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
        </button>
      )}
    </div>
    
    {/* Product Info */}
    <div className="p-4 space-y-3">
      <div className="space-y-2">
        <h3 className={`font-semibold line-clamp-2 leading-tight transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {product.name}
        </h3>
        
        <p className={`text-sm line-clamp-2 leading-relaxed transition-colors duration-300 ${
          darkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {product.description}
        </p>
      </div>
      
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            ₹{product.price.toLocaleString()}
          </span>
          <span className={`text-xs transition-colors duration-300 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>per unit</span>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-md ${
          !isInStock 
            ? darkMode 
              ? 'text-red-400 bg-red-900/50' 
              : 'text-red-600 bg-red-50'
            : isLowStock 
              ? darkMode 
                ? 'text-orange-400 bg-orange-900/50' 
                : 'text-orange-600 bg-orange-50'
              : darkMode 
                ? 'text-emerald-400 bg-emerald-900/50' 
                : 'text-emerald-600 bg-emerald-50'
        }`}>
          {!isInStock 
            ? 'Out of Stock' 
            : isLowStock 
              ? `Low Stock (${stock})` 
              : 'In Stock'
          }
        </div>
      </div>
      
      {!isInCart ? (
        <button 
          onClick={() => isInStock && onAddToCart(product.id)} 
          disabled={!isInStock}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
            !isInStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : darkMode 
                ? 'bg-white text-slate-900 hover:bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:hover:bg-emerald-600' 
                : 'bg-slate-900 text-white hover:bg-slate-800 group-hover:bg-emerald-600 group-hover:hover:bg-emerald-700'
          }`}
        >
          {!isInStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      ) : (
        <div className={`flex items-center justify-between rounded-lg border transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-700 border-slate-600' 
            : 'bg-slate-50 border-slate-200'
        }`}>
          <button 
            onClick={() => cartQuantity > 1 ? onUpdateQuantity(product.id, cartQuantity - 1) : onRemoveFromCart(product.id)}
            className={`p-2 rounded-l-lg transition-colors duration-200 hover:bg-opacity-80 ${
              darkMode 
                ? 'hover:bg-slate-600 text-slate-300' 
                : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <Minus size={16} />
          </button>
          
          <div className={`px-4 py-2 min-w-[3rem] text-center font-medium transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {cartQuantity}
          </div>
          
          <button 
            onClick={() => cartQuantity < stock && onUpdateQuantity(product.id, cartQuantity + 1)}
            disabled={cartQuantity >= stock}
            className={`p-2 rounded-r-lg transition-colors duration-200 ${
              cartQuantity >= stock
                ? darkMode 
                  ? 'text-slate-500 cursor-not-allowed' 
                  : 'text-slate-400 cursor-not-allowed'
                : darkMode 
                  ? 'hover:bg-slate-600 text-slate-300' 
                  : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default ProductCard;
