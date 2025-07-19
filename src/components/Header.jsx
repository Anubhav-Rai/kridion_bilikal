import React from 'react';
import { User, ShoppingCart, LogOut, Moon, Sun } from 'lucide-react';
import { Home } from 'lucide-react';
// src/components/Header.jsx
import logo from '../assets/kridion-logo.png'  // adjust path to wherever you put the PNG


const Header = ({ user, cartCount, onLogout, onNav, onLogin, onRegister, darkMode, toggleDarkMode }) => (
    <header className={`border-b shadow-sm sticky top-0 z-50 transition-colors duration-300 ${
        darkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-slate-200'
    }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="KRIDION(agro) Logo"
                        className="h-8 w-auto"
                    />
                    <div className="flex flex-col">
                        <span className={`text-xl font-bold transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                            KRIDION
                        </span>
                        <span className="text-xs text-emerald-600 font-semibold tracking-wide">
                            AGRO
                        </span>
                    </div>
                </div>
                
                {/* Center Navigation - Only show when no user */}
                {!user && (
                    <nav className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => onNav('home')}
                            className={`font-medium transition-colors ${
                                darkMode 
                                    ? 'text-slate-300 hover:text-white' 
                                    : 'text-slate-700 hover:text-slate-900'
                            }`}
                        >
                            Products
                        </button>
                        <span className={`font-medium ${
                            darkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>About</span>
                        <span className={`font-medium ${
                            darkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>Contact</span>
                    </nav>
                )}
                
                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                                ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={() => onNav('cart')}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            darkMode 
                                ? 'bg-white text-slate-900 hover:bg-slate-100' 
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                    >
                        <ShoppingCart size={18} />
                        <span className="hidden sm:inline">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors duration-300 ${
                                darkMode 
                                    ? 'bg-slate-700 border-slate-600' 
                                    : 'bg-slate-50 border-slate-200'
                            }`}>
                                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User size={14} className="text-emerald-600" />
                                </div>
                                <span className={`font-medium text-sm transition-colors duration-300 ${
                                    darkMode ? 'text-slate-200' : 'text-slate-700'
                                }`}>
                                    {user.name}
                                </span>
                            </div>
                            <button
                                onClick={onLogout}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                                    darkMode 
                                        ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={onLogin} 
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                                    darkMode 
                                        ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                Login
                            </button>
                            <button 
                                onClick={onRegister} 
                                className="bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
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
