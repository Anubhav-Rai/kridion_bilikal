import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, user, wishlist, onAddToCart, onToggleWishlist, darkMode }) => (
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
          darkMode 
            ? 'text-emerald-400 bg-emerald-900/50' 
            : 'text-emerald-600 bg-emerald-50'
        }`}>
          In Stock
        </div>
      </div>
      
      <button 
        onClick={() => onAddToCart(product.id)} 
        className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
          darkMode 
            ? 'bg-white text-slate-900 hover:bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:hover:bg-emerald-600' 
            : 'bg-slate-900 text-white hover:bg-slate-800 group-hover:bg-emerald-600 group-hover:hover:bg-emerald-700'
        }`}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;
