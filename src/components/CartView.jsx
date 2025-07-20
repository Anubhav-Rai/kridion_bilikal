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
  getCartTotal,
  products,
  darkMode
}) => {
  
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className={`text-5xl lg:text-6xl font-black tracking-tight transition-all duration-700 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          Your
          <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Cart
          </span>
        </h1>
        <p className={`text-xl leading-relaxed ${
          darkMode ? 'text-white/70' : 'text-black/70'
        }`}>
          Review your items and proceed to checkout
        </p>
      </div>
      {cart.length === 0 ? (
        <div className={`text-center py-20 rounded-3xl backdrop-blur-xl border ${
          darkMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-black/5 border-black/10'
        }`}>
          <ShoppingCart size={120} className={`mx-auto mb-8 ${
            darkMode ? 'text-white/40' : 'text-black/40'
          }`} />
          <h3 className={`text-2xl font-black mb-4 ${
            darkMode ? 'text-white' : 'text-black'
          }`}>Your cart is empty</h3>
          <p className={`text-lg mb-8 ${
            darkMode ? 'text-white/60' : 'text-black/60'
          }`}>Add some amazing products to get started</p>
          <button
            onClick={() => onNav('home')}
            className={`px-8 py-4 rounded-2xl font-black text-lg transition-all duration-500 hover:scale-105 ${
              darkMode 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-black text-white hover:bg-black/90'
            }`}
          >
            Continue Shopping
          </button>
        </div>
    ) : (
      <div>
        {cart.map((item, index) => {
          // More robust product matching
          const productId = item.productId || item.id;
          const prod = products.find(
            p => p.id === productId || p._id === productId
          );
          
          
          const stock = prod ? prod.stock || 0 : 0;
          const canIncreaseQuantity = stock > item.quantity;
          
          return (
            <div key={`${productId}-${index}`} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 border-b border-gray-200">
              <div className="text-3xl sm:text-4xl flex-shrink-0">{prod ? prod.image : "❓"}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">{prod ? prod.name : `Unknown Product (ID: ${productId})`}</h3>
                <p className="text-green-600 font-bold text-sm sm:text-base">
                  ₹{prod ? prod.price.toLocaleString() : "0"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="hidden sm:inline">Item ID: {productId}</span>
                  {stock > 0 && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      stock <= 5 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {stock} in stock
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => onUpdateQuantity(productId, item.quantity - 1)}
                  className="bg-gray-200 hover:bg-gray-300 p-1.5 sm:p-2 rounded-full flex-shrink-0"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                <button
                  onClick={() => canIncreaseQuantity ? onUpdateQuantity(productId, item.quantity + 1) : null}
                  disabled={!canIncreaseQuantity}
                  className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                    canIncreaseQuantity 
                      ? 'bg-gray-200 hover:bg-gray-300' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  title={!canIncreaseQuantity ? 'Cannot exceed available stock' : 'Increase quantity'}
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => onRemoveFromCart(productId)}
                className="text-red-500 hover:text-red-600 p-1 flex-shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xl font-bold text-center mb-4">
            Total: ₹{getCartTotal().toLocaleString()}
          </div>
          {user ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Delivery Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={address.fullName || ''}
                      onChange={e => onUpdateAddress({...address, fullName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={address.phone || ''}
                      onChange={e => onUpdateAddress({...address, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={address.street || ''}
                      onChange={e => onUpdateAddress({...address, street: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123 Main Street, Apt 4B"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={address.city || ''}
                      onChange={e => onUpdateAddress({...address, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      value={address.state || ''}
                      onChange={e => onUpdateAddress({...address, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={address.postalCode || ''}
                      onChange={e => onUpdateAddress({...address, postalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <select
                      value={address.country || ''}
                      onChange={e => onUpdateAddress({...address, country: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="CH">Switzerland</option>
                      <option value="AT">Austria</option>
                      <option value="SE">Sweden</option>
                      <option value="NO">Norway</option>
                      <option value="DK">Denmark</option>
                      <option value="FI">Finland</option>
                      <option value="IE">Ireland</option>
                      <option value="PT">Portugal</option>
                      <option value="GR">Greece</option>
                      <option value="PL">Poland</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="HU">Hungary</option>
                      <option value="RO">Romania</option>
                      <option value="BG">Bulgaria</option>
                      <option value="HR">Croatia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SK">Slovakia</option>
                      <option value="LT">Lithuania</option>
                      <option value="LV">Latvia</option>
                      <option value="EE">Estonia</option>
                      <option value="JP">Japan</option>
                      <option value="KR">South Korea</option>
                      <option value="SG">Singapore</option>
                      <option value="HK">Hong Kong</option>
                      <option value="TW">Taiwan</option>
                      <option value="MY">Malaysia</option>
                      <option value="TH">Thailand</option>
                      <option value="PH">Philippines</option>
                      <option value="VN">Vietnam</option>
                      <option value="ID">Indonesia</option>
                      <option value="IN">India</option>
                      <option value="CN">China</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                      <option value="AR">Argentina</option>
                      <option value="CL">Chile</option>
                      <option value="CO">Colombia</option>
                      <option value="PE">Peru</option>
                      <option value="UY">Uruguay</option>
                      <option value="ZA">South Africa</option>
                      <option value="EG">Egypt</option>
                      <option value="MA">Morocco</option>
                      <option value="NG">Nigeria</option>
                      <option value="KE">Kenya</option>
                      <option value="GH">Ghana</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="QA">Qatar</option>
                      <option value="KW">Kuwait</option>
                      <option value="BH">Bahrain</option>
                      <option value="OM">Oman</option>
                      <option value="JO">Jordan</option>
                      <option value="LB">Lebanon</option>
                      <option value="IL">Israel</option>
                      <option value="TR">Turkey</option>
                      <option value="RU">Russia</option>
                      <option value="UA">Ukraine</option>
                      <option value="BY">Belarus</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="NZ">New Zealand</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions</label>
                    <textarea
                      value={address.instructions || ''}
                      onChange={e => onUpdateAddress({...address, instructions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                      placeholder="Delivery instructions, apartment number, etc."
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-blue-700 font-medium">Worldwide Delivery Available</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    We deliver to all countries listed above. Shipping costs will be calculated based on your location.
                  </p>
                </div>
              </div>
              <button
                onClick={onPlaceOrder}
                disabled={!address.fullName || !address.phone || !address.street || !address.city || !address.postalCode || !address.country}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
};

export default CartView;
