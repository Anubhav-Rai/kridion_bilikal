import React from 'react';
import { Package, Heart, Settings, ShoppingBag } from 'lucide-react';

const Navigation = ({ user, currentView, onNav, darkMode, isMobile }) => user && (
  <nav className={isMobile ? "p-2" : "p-6"}>
    {isMobile ? (
      // Mobile Bottom Navigation
      <div className="flex justify-around items-center">
        <button 
          onClick={() => onNav('home')} 
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'home' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package size={18} />
          <span className="text-xs font-medium">Products</span>
        </button>
        
        <button 
          onClick={() => onNav('orders')} 
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'orders' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingBag size={18} />
          <span className="text-xs font-medium">Orders</span>
        </button>
        
        <button 
          onClick={() => onNav('wishlist')} 
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'wishlist' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart size={18} />
          <span className="text-xs font-medium">Wishlist</span>
        </button>
        
        <button 
          onClick={() => onNav('profile')} 
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'profile' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Settings size={18} />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    ) : (
      // Desktop Sidebar Navigation
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
    )}
  </nav>
);

export default Navigation;
