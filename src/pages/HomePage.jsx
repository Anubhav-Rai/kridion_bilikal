import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { useStore } from '../context/StoreContext';
import { getProductId } from '../utils/product';

const SkeletonCard = () => (
  <div>
    <div className="aspect-square animate-pulse bg-sub" />
    <div className="mt-3 h-3 w-3/4 animate-pulse bg-sub" />
    <div className="mt-2 h-3 w-1/3 animate-pulse bg-sub" />
  </div>
);

const HomePage = () => {
  const { products, productsLoading } = useStore();

  return (
    <div className="space-y-12">
      <section className="max-w-2xl">
        <p className="eyebrow mb-3">Kridion Agro</p>
        <h1 className="text-2xl font-normal leading-snug text-ink sm:text-3xl">
          Premium kitchen essentials, made simple.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Handcrafted teak wood and authentic spices — quietly good things for everyday cooking.
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="text-sm font-medium tracking-wide text-ink">Products</h2>
          <span className="text-xs text-muted">
            {productsLoading ? 'Loading…' : `${products.length} items`}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {productsLoading ? (
            [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={getProductId(product)} product={product} />)
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-sm text-ink">No products available</p>
              <p className="mt-1 text-sm text-muted">Check back later for new arrivals.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
