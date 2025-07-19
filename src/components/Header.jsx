import React from 'react';
import { User, ShoppingCart, LogOut } from 'lucide-react';
import { Home } from 'lucide-react';
// src/components/Header.jsx
import logo from '../assets/kridion-logo.png'  // adjust path to wherever you put the PNG


const Header = ({ user, cartCount, onLogout, onNav, onLogin, onRegister }) => (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
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
                        <span className="text-xl font-bold text-slate-900">
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
                            className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                        >
                            Products
                        </button>
                        <span className="text-slate-700 font-medium">About</span>
                        <span className="text-slate-700 font-medium">Contact</span>
                    </nav>
                )}
                
                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNav('cart')}
                        className="relative flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <ShoppingCart size={18} />
                        <span className="hidden sm:inline font-medium">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User size={14} className="text-emerald-600" />
                                </div>
                                <span className="text-slate-700 font-medium text-sm">
                                    {user.name}
                                </span>
                            </div>
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={onLogin} 
                                className="text-slate-700 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
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
