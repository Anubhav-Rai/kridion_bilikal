import React from 'react';
import { Heart } from 'lucide-react';
import ProductCard from './ProductCard';

const WishlistView = ({ products, wishlist, user, onAddToCart, onToggleWishlist }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
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
