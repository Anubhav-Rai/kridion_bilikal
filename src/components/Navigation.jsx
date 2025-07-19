import React from 'react';
import { Package, Heart, Settings, ShoppingBag } from 'lucide-react';

const Navigation = ({ user, currentView, onNav }) => user && (
  <nav className="p-6">
    <div className="space-y-2">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
        Menu
      </div>
      
      <button 
        onClick={() => onNav('home')} 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-left ${
          currentView === 'home' 
            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600' 
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Package size={18} />
        <span>Products</span>
      </button>
      
      <button 
        onClick={() => onNav('orders')} 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-left ${
          currentView === 'orders' 
            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600' 
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <ShoppingBag size={18} />
        <span>My Orders</span>
      </button>
      
      <button 
        onClick={() => onNav('wishlist')} 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-left ${
          currentView === 'wishlist' 
            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600' 
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Heart size={18} />
        <span>Wishlist</span>
      </button>
      
      <button 
        onClick={() => onNav('profile')} 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-left ${
          currentView === 'profile' 
            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600' 
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Settings size={18} />
        <span>Profile</span>
      </button>
    </div>
  </nav>
);

export default Navigation;
