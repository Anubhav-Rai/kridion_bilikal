import React from 'react';
import { Package, Heart, Settings, ShoppingBag, Info, Phone, User } from 'lucide-react';

const Navigation = ({ user, currentView, onNav, darkMode, isMobile }) => user && (
  <nav className={isMobile ? "p-2" : "p-6"}>
    {isMobile ? (
      // Mobile Bottom Navigation
      <div className="flex justify-around items-center">
        <button 
          onClick={() => onNav('home')} 
          className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'home' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package size={16} />
          <span className="text-xs font-medium">Products</span>
        </button>
        
        <button 
          onClick={() => onNav('orders')} 
          className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'orders' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingBag size={16} />
          <span className="text-xs font-medium">Orders</span>
        </button>
        
        <button 
          onClick={() => onNav('wishlist')} 
          className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'wishlist' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart size={16} />
          <span className="text-xs font-medium">Wishlist</span>
        </button>

        <button 
          onClick={() => onNav('about')} 
          className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'about' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Info size={16} />
          <span className="text-xs font-medium">About</span>
        </button>
        
        <button 
          onClick={() => onNav('contact')} 
          className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'contact' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Phone size={16} />
          <span className="text-xs font-medium">Contact</span>
        </button>
        
        <button 
          onClick={() => onNav('profile')} 
          className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'profile' 
              ? darkMode 
                ? 'text-emerald-400' 
                : 'text-emerald-600'
              : darkMode 
                ? 'text-slate-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User size={16} />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    ) : (
      // Desktop Sidebar Navigation
      <div className="space-y-3">
        <div className={`text-xs font-semibold uppercase tracking-wide mb-4 transition-colors duration-300 ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Menu
        </div>
        
        <button 
          onClick={() => onNav('home')} 
          className={`w-full flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-left shadow-lg ${
            currentView === 'home' 
              ? darkMode 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <Package size={18} className="lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">Products</span>
        </button>
        
        <button 
          onClick={() => onNav('orders')} 
          className={`w-full flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-left shadow-lg ${
            currentView === 'orders' 
              ? darkMode 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <ShoppingBag size={18} className="lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">My Orders</span>
        </button>
        
        <button 
          onClick={() => onNav('wishlist')} 
          className={`w-full flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-left shadow-lg ${
            currentView === 'wishlist' 
              ? darkMode 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <Heart size={18} className="lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">Wishlist</span>
        </button>
        
        <button 
          onClick={() => onNav('about')} 
          className={`w-full flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-left shadow-lg ${
            currentView === 'about' 
              ? darkMode 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <Info size={18} className="lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">About</span>
        </button>
        
        <button 
          onClick={() => onNav('contact')} 
          className={`w-full flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-left shadow-lg ${
            currentView === 'contact' 
              ? darkMode 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <Phone size={18} className="lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">Contact</span>
        </button>
        
        <button 
          onClick={() => onNav('profile')} 
          className={`w-full flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 font-medium text-left shadow-lg ${
            currentView === 'profile' 
              ? darkMode 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : darkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <Settings size={18} className="lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-base">Profile</span>
        </button>
      </div>
    )}
  </nav>
);

export default Navigation;
