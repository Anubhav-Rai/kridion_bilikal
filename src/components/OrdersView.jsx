import React from 'react';
import { Package } from 'lucide-react';


const OrdersView = ({ orders, products, darkMode }) => {
  // Calculate order total from items
  const calculateOrderTotal = (orderItems) => {
    return orderItems.reduce((total, item) => {
      const productId = item.productId || item.id;
      const prod = products.find(
        p => String(p.id) === String(productId) || String(p._id) === String(productId)
      );
      const itemTotal = prod ? prod.price * item.quantity : 0;
      return total + itemTotal;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className={`text-5xl lg:text-6xl font-black tracking-tight transition-all duration-700 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          Your
          <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Orders
          </span>
        </h1>
        <p className={`text-xl leading-relaxed ${
          darkMode ? 'text-white/70' : 'text-black/70'
        }`}>
          Track your purchases and order history
        </p>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const orderTotal = order.items && order.items.length > 0 
              ? calculateOrderTotal(order.items) 
              : order.total || 0;
            
            return (
              <div key={order.id || order._id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id || order._id}</h3>
                    <p className="text-sm text-gray-600">
                      {order.date ? new Date(order.date).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {order.status || 'Processing'}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items && order.items.length > 0 ? order.items.map(item => {
                    const productId = item.productId || item.id;
                    const prod = products.find(
                      p => String(p.id) === String(productId) || String(p._id) === String(productId)
                    );
                    const itemTotal = prod ? prod.price * item.quantity : 0;
                    
                    return (
                      <div key={productId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{prod ? prod.image : "❓"}</div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {prod ? prod.name : "Unknown Product"}
                            </p>
                            <p className="text-sm text-gray-600">
                              ₹{prod ? prod.price.toLocaleString() : "0"} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{itemTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  }) : (
                    <p className="text-gray-500">No items in this order</p>
                  )}
                </div>

                {/* Order Total */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{orderTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersView;

