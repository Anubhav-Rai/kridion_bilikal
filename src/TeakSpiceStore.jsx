import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductCard from './components/ProductCard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CartView from './components/CartView';
import OrdersView from './components/OrdersView';
import WishlistView from './components/WishlistView';
import ProfileView from './components/ProfileView';
import CompanyInfo from './components/CompanyInfo';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { Package, Info, Phone } from 'lucide-react';

const normalizeOrders = (data) => {
  return Array.isArray(data) ? data.map(order => ({
    ...order,
    userId: order.userid || order.userId,
    items: Array.isArray(order.items) ? order.items.map(item => ({
      ...item,
      productId: item.productid || item.productId,
    })) : [],
  })) : [];
};


const TeakSpiceStore = () => {
  // App state
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState([]); // always an array!
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // JWT Helper
  const getToken = () => localStorage.getItem('token');
  const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

  // Fetch products on mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      });
  }, []);

  // Try auto-login on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, { headers: authHeader() })
        .then(res => res.ok ? res.json() : null)
        .then(u => { if (u) setUser(u); })
        .catch(() => {});
    }
  }, []);

  // Fetch user-specific data after login
  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
        .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, { headers: authHeader() })
        .then(res => res.json()).then(data => setWishlist(Array.isArray(data.productIds) ? data.productIds : []));
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, { headers: authHeader() })
        .then(res => res.json()).then(data => setOrders(normalizeOrders(data)));
    } else {
      setCart([]); setWishlist([]); setOrders([]);
    }
  }, [user]);

  // --- Auth Handlers (REAL) ---
  const handleLogin = async (email, password) => {
    if (!email || !password) return alert('Please fill all fields');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        alert('Login failed');
        setLoading(false);
        return;
      }
      const result = await res.json();
      setUser(result.user);
      localStorage.setItem('token', result.token);
      setCurrentView('home');
    } catch (e) {
      alert('Login error');
    }
    setLoading(false);
  };

  const handleRegister = async ({ name, email, phone, password }) => {
    if (!name || !email || !phone || !password) return alert('Please fill all fields');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      if (!res.ok) {
        alert('Registration failed');
        setLoading(false);
        return;
      }
      // Auto-login after register
      await handleLogin(email, password);
    } catch (e) {
      alert('Registration error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setWishlist([]);
    localStorage.removeItem('token');
    setCurrentView('home');
  };

  // --- Cart Handlers ---
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    // Refresh cart
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
      .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
  };

  const removeFromCart = async (productId) => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
      method: 'DELETE',
      headers: authHeader()
    });
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
      .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    });
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
      .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const productId = item.productId || item.id;
      const prod = products.find(
        p => String(p.id) === String(productId) || String(p._id) === String(productId)
      );
      
      const itemTotal = prod ? prod.price * item.quantity : 0;
      return total + itemTotal;
    }, 0);
  };

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  // --- Wishlist Handlers ---
  const toggleWishlist = async (productId) => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    if (wishlist.includes(productId)) {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${productId}`, { method: 'DELETE', headers: authHeader() });
    } else {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, { headers: authHeader() })
      .then(res => res.json()).then(data => setWishlist(Array.isArray(data.productIds) ? data.productIds : []));
  };

  // --- Order Handler ---
  const placeOrder = async () => {
    // Validate required address fields
    if (!address.fullName || !address.phone || !address.street || !address.city || !address.postalCode || !address.country) {
      return alert('Please fill in all required address fields');
    }
    
    const orderItems = cart.map(item => ({
      productId: item.productId || item.id,
      quantity: item.quantity
    }));
    
    // Convert structured address to string format for backend compatibility
    const addressString = `${address.fullName}\n${address.phone}\n${address.street}\n${address.city}${address.state ? ', ' + address.state : ''} ${address.postalCode}\n${address.country}${address.instructions ? '\n\nInstructions: ' + address.instructions : ''}`;
    
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: addressString, items: orderItems })
    });
    
    if (!res.ok) {
      alert('Order failed');
      return;
    }
    
    // Refresh orders and cart
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, { headers: authHeader() })
      .then(res => res.json()).then(data => setOrders(normalizeOrders(data)));
    setCart([]);
    setAddress({});
    alert('Order placed successfully!');
    setCurrentView('orders');
  };

  // --- Dark mode handler ---
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  // --- Navigation handler ---
  const handleNav = (view) => setCurrentView(view);

  // --- Rendering ---
  console.log("TeakSpiceStore: orders state", orders);
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Header
        user={user}
        cartCount={getCartCount()}
        onLogout={handleLogout}
        onNav={handleNav}
        onLogin={() => setCurrentView('login')}
        onRegister={() => setCurrentView('register')}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation - Desktop */}
        {user && (
          <>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:block w-64 shadow-sm border-r min-h-screen sticky top-16 transition-colors duration-300 ${
              darkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              <Navigation user={user} currentView={currentView} onNav={handleNav} darkMode={darkMode} />
            </aside>
            
            {/* Mobile Bottom Navigation */}
            <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-colors duration-300 ${
              darkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              <Navigation user={user} currentView={currentView} onNav={handleNav} darkMode={darkMode} isMobile={true} />
            </div>
          </>
        )}
        
        {/* Mobile Navigation for Non-logged-in users */}
        {!user && (
          <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <nav className="p-2">
              <div className="flex justify-around items-center">
                <button 
                  onClick={() => handleNav('home')} 
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
                  onClick={() => handleNav('about')} 
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
                  onClick={() => handleNav('contact')} 
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
              </div>
            </nav>
          </div>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 ${
          user ? 'pb-20 lg:pb-8' : 'pb-20 lg:pb-8 mx-auto max-w-7xl'
        }`}>
          {currentView === 'home' && (
            <div className="space-y-8">
              <CompanyInfo darkMode={darkMode} />
              
              <div className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>Our Products</h2>
                    <p className={`mt-1 transition-colors duration-300 ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>Premium quality spices and kitchen essentials</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {Array.isArray(products) ? products.length : 0} products available
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map(product => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
                        user={user}
                        wishlist={wishlist}
                        onAddToCart={addToCart}
                        onToggleWishlist={toggleWishlist}
                        darkMode={darkMode}
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}>No products available</h3>
                      <p className={`transition-colors duration-300 ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>Check back later for new arrivals.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
              loading={loading}
            />
          )}
          {currentView === 'register' && (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
              loading={loading}
            />
          )}
          {currentView === 'cart' && (
            <CartView
              cart={cart}
              user={user}
              address={address}
              onUpdateAddress={setAddress}
              onPlaceOrder={placeOrder}
              onNav={handleNav}
              onUpdateQuantity={updateCartQuantity}
              onRemoveFromCart={removeFromCart}
              getCartTotal={getCartTotal}
              products={products}
            />
          )}
          {currentView === 'orders' && user && <OrdersView orders={orders} products={products} />}
          {currentView === 'wishlist' && user && (
            <WishlistView
              products={products}
              wishlist={wishlist}
              user={user}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          )}
          {currentView === 'profile' && user && <ProfileView user={user} />}
          {currentView === 'about' && <AboutUs darkMode={darkMode} />}
          {currentView === 'contact' && <ContactUs darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
};

export default TeakSpiceStore;
