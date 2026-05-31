import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { useStore } from '../context/StoreContext';
import { findProduct, formatPrice, getLineItemId } from '../utils/product';

const OrdersPage = () => {
  const { orders, productIndex } = useStore();

  const lineTotal = (item) => {
    const product = findProduct(productIndex, getLineItemId(item));
    return product ? product.price * item.quantity : 0;
  };
  const orderTotal = (order) =>
    order.items?.length ? order.items.reduce((sum, item) => sum + lineTotal(item), 0) : order.total || 0;

  return (
    <div>
      <PageHeader eyebrow="History" title="Orders" subtitle="Track your purchases and order history." />

      {orders.length === 0 ? (
        <p className="border-t border-line pt-10 text-sm text-muted">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const id = order.id || order._id;
            return (
              <article key={id} className="border border-line">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <div>
                    <h3 className="text-sm text-ink">Order #{String(id).slice(-8)}</h3>
                    <p className="mt-0.5 text-xs text-muted">
                      {order.date ? new Date(order.date).toLocaleDateString() : ''}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {order.status || 'Processing'}
                  </span>
                </div>

                <div className="divide-y divide-line px-5">
                  {order.items?.length ? (
                    order.items.map((item, index) => {
                      const product = findProduct(productIndex, getLineItemId(item));
                      return (
                        <div key={`${getLineItemId(item)}-${index}`} className="flex items-center gap-4 py-3">
                          <div className="grid h-12 w-12 flex-shrink-0 place-items-center bg-sub text-2xl">
                            {product ? product.image : '—'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">
                              {product ? product.name : 'Unknown product'}
                            </p>
                            <p className="mt-0.5 text-xs text-muted">
                              {formatPrice(product ? product.price : 0)} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm tabular-nums text-ink">{formatPrice(lineTotal(item))}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="py-3 text-sm text-muted">No items in this order</p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-line px-5 py-4">
                  <span className="text-sm text-muted">Total</span>
                  <span className="text-sm font-medium tabular-nums text-ink">{formatPrice(orderTotal(order))}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
