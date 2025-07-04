import React from 'react';
import { Package, Heart, Settings } from 'lucide-react';

const Navigation = ({ user, currentView, onNav }) => user && (
  <nav className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-lg">
    <div className="flex gap-4 justify-center">
      <button onClick={() => onNav('home')} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${currentView === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}><Package size={16} />Products</button>
      <button onClick={() => onNav('orders')} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${currentView === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}><Package size={16} />My Orders</button>
      <button onClick={() => onNav('wishlist')} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${currentView === 'wishlist' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}><Heart size={16} />Wishlist</button>
      <button onClick={() => onNav('profile')} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${currentView === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}><Settings size={16} />Profile</button>
    </div>
  </nav>
);

export default Navigation;
