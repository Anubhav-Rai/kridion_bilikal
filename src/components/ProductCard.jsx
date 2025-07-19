import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, user, wishlist, onAddToCart, onToggleWishlist }) => (
  <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-slate-300">
    {/* Product Image */}
    <div className="relative bg-slate-50 h-48 flex items-center justify-center">
      <div className="text-4xl filter drop-shadow-sm">
        {product.image}
      </div>
      {user && (
        <button 
          onClick={() => onToggleWishlist(product.id)} 
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
            wishlist.includes(product.id) 
              ? 'bg-rose-500 text-white shadow-md' 
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
        <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>
      
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-slate-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500">per unit</span>
        </div>
        <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md font-medium">
          In Stock
        </div>
      </div>
      
      <button 
        onClick={() => onAddToCart(product.id)} 
        className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors group-hover:bg-emerald-600 group-hover:hover:bg-emerald-700"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;
