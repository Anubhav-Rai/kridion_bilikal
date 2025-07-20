import React from 'react';
import { Heart } from 'lucide-react';
import ProductCard from './ProductCard';

const WishlistView = ({ products, wishlist, user, onAddToCart, onToggleWishlist, darkMode }) => (
  <div className="max-w-6xl mx-auto space-y-12">
    {/* Hero Section */}
    <div className="text-center space-y-6">
      <h1 className={`text-5xl lg:text-6xl font-black tracking-tight transition-all duration-700 ${
        darkMode ? 'text-white' : 'text-black'
      }`}>
        Your
        <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Wishlist
        </span>
      </h1>
      <p className={`text-xl leading-relaxed ${
        darkMode ? 'text-white/70' : 'text-black/70'
      }`}>
        Your favorite products saved for later
      </p>
    </div>
    {wishlist.length === 0 ? (
      <div className="text-center py-8">
        <Heart size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No items in wishlist</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.filter(p => wishlist.includes(p.id)).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            user={user}
            wishlist={wishlist}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    )}
  </div>
);

export default WishlistView;
