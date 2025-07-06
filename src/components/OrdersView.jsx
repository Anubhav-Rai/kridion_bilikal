import React from 'react';
import { Package } from 'lucide-react';


const OrdersView = ({ orders, products }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold mb-6">My Orders</h2>
    {orders.length === 0 ? (
      <div className="text-center py-8">
        <Package size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No orders yet</p>
      </div>
    ) : (
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id || order._id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">Order #{order.id || order._id}</h3>
                <p className="text-sm text-gray-600">
                  {order.date ? new Date(order.date).toLocaleDateString() : ""}
                </p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>
            <div className="text-green-600 font-bold">₹{order.total ? order.total.toLocaleString() : "0"}</div>
            <div className="mt-2 text-sm text-gray-600">
              {order.items && order.items.length > 0 ? order.items.map(item => {
                const prod = products.find(
                  p => (p.id === item.productId || p._id === item.productId || p._id === item.id)
                );
                console.log("OrdersView orders prop:", orders);
                return (
                  <div key={item.productId || item.id}>
                    {prod ? prod.name : "Unknown Product"} x {item.quantity}
                  </div>
                );
              }) : null}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default OrdersView;

