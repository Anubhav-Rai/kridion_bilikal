import React from 'react';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

const CartView = ({
  cart,
  user,
  address,
  onUpdateAddress,
  onPlaceOrder,
  onNav,
  onUpdateQuantity,
  onRemoveFromCart,
  getCartTotal
}) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
    {cart.length === 0 ? (
      <div className="text-center py-8">
        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">Your cart is empty</p>
        <button
          onClick={() => onNav('home')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    ) : (
      <div>
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-200">
            <div className="text-4xl">{item.image}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-600 font-bold">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => onRemoveFromCart(item.id)}
              className="text-red-500 hover:text-red-600 p-1"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xl font-bold text-center mb-4">
            Total: ₹{getCartTotal().toLocaleString()}
          </div>
          {user ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={e => onUpdateAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter your delivery address"
                />
              </div>
              <button
                onClick={onPlaceOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Place Order
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please login to place an order</p>
              <button
                onClick={() => onNav('login')}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

export default CartView;
