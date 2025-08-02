import React from 'react';
import { User, ShoppingCart, LogOut, Moon, Sun, Info, Phone } from 'lucide-react';
import { Home } from 'lucide-react';
// src/components/Header.jsx
import logo from '../assets/kridion-logo.png'  // adjust path to wherever you put the PNG


const Header = ({ user, cartCount, onLogout, onNav, onLogin, onRegister, darkMode, toggleDarkMode }) => (
    <header className={`fixed top-0 left-0 right-0 z-[60] backdrop-blur-sm transition-all duration-700 ${
        darkMode 
            ? 'bg-black/30' 
            : 'bg-white/30'
    }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
                {/* Logo Section */}
                <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group transition-all duration-300 hover:scale-105 relative z-10" onClick={() => onNav('home')}>
                    <div className="relative">
                        <img
                            src={logo}
                            alt="KRIDION(agro) Logo"
                            className="h-8 sm:h-10 lg:h-12 w-auto filter drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-lg sm:text-xl lg:text-2xl font-black tracking-tight transition-all duration-300 ${
                            darkMode ? 'text-white' : 'text-black'
                        }`}>
                            KRIDION
                        </span>
                        <span className={`text-xs font-semibold tracking-[0.2em] opacity-60 ${
                            darkMode ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>
                            AGRO
                        </span>
                    </div>
                </div>
                
                
                {/* Center & Right Section */}
                <div className="flex items-center justify-between flex-1 gap-4 lg:gap-8 relative z-10 ml-8 lg:ml-16">
                    {/* Desktop Navigation for Non-logged-in users */}
                    {!user && (
                        <nav className="hidden lg:flex items-center gap-6">
                            <button 
                                onClick={() => onNav('about')} 
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                                    darkMode 
                                        ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
                                }`}
                            >
                                <Info size={16} />
                                <span>About</span>
                            </button>
                            <button 
                                onClick={() => onNav('contact')} 
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                                    darkMode 
                                        ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
                                }`}
                            >
                                <Phone size={16} />
                                <span>Contact</span>
                            </button>
                        </nav>
                    )}
                    
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg ${
                            darkMode 
                                ? 'text-yellow-400 hover:text-yellow-300 bg-slate-800/80 hover:bg-slate-700/80 shadow-slate-900/20' 
                                : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-slate-100/80 shadow-slate-200/20'
                        }`}
                        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? <Sun size={20} className="drop-shadow-lg lg:w-6 lg:h-6" /> : <Moon size={20} className="drop-shadow-lg lg:w-6 lg:h-6" />}
                    </button>

                    <button
                        onClick={() => onNav('cart')}
                        className={`relative flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-sm lg:text-base shadow-lg ${
                            darkMode 
                                ? 'bg-white text-slate-900 hover:bg-slate-100' 
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                    >
                        <ShoppingCart size={18} className="lg:w-5 lg:h-5" />
                        <span className="hidden sm:inline">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    
                    {user ? (
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className={`hidden sm:flex items-center gap-3 px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl border transition-all duration-300 shadow-lg ${
                                darkMode 
                                    ? 'bg-slate-700 border-slate-600' 
                                    : 'bg-slate-50 border-slate-200'
                            }`}>
                                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User size={14} className="text-emerald-600 lg:w-4 lg:h-4" />
                                </div>
                                <span className={`font-medium text-sm lg:text-base transition-colors duration-300 ${
                                    darkMode ? 'text-slate-200' : 'text-slate-700'
                                }`}>
                                    {user.name}
                                </span>
                            </div>
                            <button
                                onClick={onLogout}
                                className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                                    darkMode 
                                        ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                <LogOut size={16} className="lg:w-5 lg:h-5" />
                                <span className="hidden sm:inline text-sm lg:text-base font-medium">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 lg:gap-4">
                            <button 
                                onClick={onLogin} 
                                className={`font-medium px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base shadow-lg ${
                                    darkMode 
                                        ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                Login
                            </button>
                            <button 
                                onClick={onRegister} 
                                className="bg-emerald-600 text-white font-medium px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:scale-105 text-sm lg:text-base shadow-lg"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </header>
);

export default Header;
