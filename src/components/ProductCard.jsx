import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, user, wishlist, onAddToCart, onToggleWishlist }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
    <div className="text-8xl text-center mb-4">{product.image}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
    <p className="text-gray-600 mb-4">{product.description}</p>
    <div className="text-2xl font-bold text-green-600 mb-4">₹{product.price.toLocaleString()}</div>
    <div className="flex gap-2 mb-4">
      <button onClick={() => onAddToCart(product.id)} className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all">Add to Cart</button>
      {user && (
        <button onClick={() => onToggleWishlist(product.id)} className={`p-3 rounded-full transition-colors ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
          <Heart size={20} />
        </button>
      )}
    </div>
  </div>
);

export default ProductCard;
