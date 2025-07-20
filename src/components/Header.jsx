import React from 'react';
import { User, ShoppingCart, LogOut, Moon, Sun } from 'lucide-react';
import { Home } from 'lucide-react';
// src/components/Header.jsx
import logo from '../assets/kridion-logo.png'  // adjust path to wherever you put the PNG


const Header = ({ user, cartCount, onLogout, onNav, onLogin, onRegister, darkMode, toggleDarkMode }) => (
    <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-700">
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
                
                {/* Modern Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {['Products', 'About', 'Contact'].map((item, index) => (
                        <button
                            key={item}
                            onClick={() => onNav(item === 'Products' ? 'home' : item.toLowerCase())}
                            className={`relative px-8 py-3 font-medium text-lg transition-all duration-500 hover:scale-105 group ${
                                darkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
                            }`}
                        >
                            <span className="relative z-10">{item}</span>
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                                darkMode 
                                    ? 'bg-white/10 group-hover:bg-white/20' 
                                    : 'bg-black/5 group-hover:bg-black/10'
                            }`}></div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500"></div>
                        </button>
                    ))}
                </nav>
                
                {/* Right Section */}
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 relative z-10">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg ${
                            darkMode 
                                ? 'text-yellow-400 hover:text-yellow-300 bg-slate-800/80 hover:bg-slate-700/80 shadow-slate-900/20' 
                                : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-slate-100/80 shadow-slate-200/20'
                        }`}
                        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? <Sun size={16} className="drop-shadow-lg sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="drop-shadow-lg sm:w-[18px] sm:h-[18px]" />}
                    </button>

                    <button
                        onClick={() => onNav('cart')}
                        className={`relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm ${
                            darkMode 
                                ? 'bg-white text-slate-900 hover:bg-slate-100' 
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                    >
                        <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className={`hidden sm:flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors duration-300 ${
                                darkMode 
                                    ? 'bg-slate-700 border-slate-600' 
                                    : 'bg-slate-50 border-slate-200'
                            }`}>
                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User size={12} className="text-emerald-600" />
                                </div>
                                <span className={`font-medium text-xs sm:text-sm transition-colors duration-300 ${
                                    darkMode ? 'text-slate-200' : 'text-slate-700'
                                }`}>
                                    {user.name}
                                </span>
                            </div>
                            <button
                                onClick={onLogout}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                                    darkMode 
                                        ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                <LogOut size={14} />
                                <span className="hidden sm:inline text-sm">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button 
                                onClick={onLogin} 
                                className={`font-medium px-2 py-1.5 sm:px-3 lg:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                                    darkMode 
                                        ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                Login
                            </button>
                            <button 
                                onClick={onRegister} 
                                className="bg-emerald-600 text-white font-medium px-2 py-1.5 sm:px-3 lg:px-4 sm:py-2 rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm"
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
