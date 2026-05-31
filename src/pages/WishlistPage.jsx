import React from 'react';
import ProductCard from '../components/product/ProductCard';
import PageHeader from '../components/ui/PageHeader';
import { useStore } from '../context/StoreContext';
import { getProductId } from '../utils/product';

const WishlistPage = () => {
  const { wishlistProducts } = useStore();

  return (
    <div>
      <PageHeader eyebrow="Saved" title="Wishlist" subtitle="Products you've saved for later." />

      {wishlistProducts.length === 0 ? (
        <p className="border-t border-line pt-10 text-sm text-muted">No items in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={getProductId(product)} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
