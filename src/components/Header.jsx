import React from 'react';
import { User, ShoppingCart, LogOut } from 'lucide-react';
import { Home } from 'lucide-react';
// src/components/Header.jsx
import logo from '../assets/kridion-logo.png'  // adjust path to wherever you put the PNG


const Header = ({ user, cartCount, onLogout, onNav, onLogin, onRegister }) => (
    <header className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
                <img
                    src={logo}
                    alt="KRIDION(agro) Logo"
                    className="h-12 w-auto"
                />
                <span className="mt-2 text-3xl font-bold text-amber-800">
                    KRIDION(agro)
                </span>
            </div>
            <div className="flex items-center gap-4">
                {/* Home Button */}
                <button
                    onClick={() => onNav('home')}
                    className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600 font-semibold"
                    title="Go to Home"
                >
                    <Home size={20} />
                    <span className="hidden sm:inline">Home</span>
                </button>
                <button
                    onClick={() => onNav('cart')}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                    <ShoppingCart size={20} /> Cart ({cartCount})
                </button>
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <User size={20} className="text-gray-600" />
                            <span className="text-gray-800">Hi, {user.name}</span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={onLogin} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">Login</button>
                        <button onClick={onRegister} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">Register</button>
                    </div>
                )}
            </div>
        </div>
    </header>
);

export default Header;
