import React from 'react';
import { Package, Heart, Settings, ShoppingBag } from 'lucide-react';

const Navigation = ({ user, currentView, onNav, darkMode }) => user && (
  <nav className="p-6">
    <div className="space-y-2">
      <div className={`text-xs font-semibold uppercase tracking-wide mb-4 transition-colors duration-300 ${
        darkMode ? 'text-slate-400' : 'text-slate-500'
      }`}>
        Menu
      </div>
      
      <button 
        onClick={() => onNav('home')} 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-left ${
          currentView === 'home' 
            ? darkMode 
              ? 'bg-emerald-900/50 text-emerald-400 border-r-2 border-emerald-500' 
              : 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
            : darkMode 
              ? 'text-slate-300 hover:bg-slate-700 hover:text-white' 
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
            ? darkMode 
              ? 'bg-emerald-900/50 text-emerald-400 border-r-2 border-emerald-500' 
              : 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
            : darkMode 
              ? 'text-slate-300 hover:bg-slate-700 hover:text-white' 
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
            ? darkMode 
              ? 'bg-emerald-900/50 text-emerald-400 border-r-2 border-emerald-500' 
              : 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
            : darkMode 
              ? 'text-slate-300 hover:bg-slate-700 hover:text-white' 
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
            ? darkMode 
              ? 'bg-emerald-900/50 text-emerald-400 border-r-2 border-emerald-500' 
              : 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
            : darkMode 
              ? 'text-slate-300 hover:bg-slate-700 hover:text-white' 
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
