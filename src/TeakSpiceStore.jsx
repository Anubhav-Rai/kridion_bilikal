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
    
    // Check stock availability before adding to cart
    const product = products.find(p => String(p.id) === String(productId) || String(p._id) === String(productId));
    const availableStock = product ? product.stock || 0 : 0;
    
    // Get current quantity in cart for this product
    const currentCartItem = cart.find(item => 
      String(item.productId) === String(productId) || String(item.id) === String(productId)
    );
    const currentQuantityInCart = currentCartItem ? currentCartItem.quantity : 0;
    
    if (availableStock <= 0) {
      alert('This product is out of stock');
      return;
    }
    
    if (currentQuantityInCart + quantity > availableStock) {
      alert(`Only ${availableStock} items available. You already have ${currentQuantityInCart} in your cart.`);
      return;
    }
    
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      });
      
      // Refresh cart
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
        .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
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
    
    // Check stock availability before updating quantity
    const product = products.find(p => String(p.id) === String(productId) || String(p._id) === String(productId));
    const availableStock = product ? product.stock || 0 : 0;
    
    if (newQuantity > availableStock) {
      alert(`Only ${availableStock} items available in stock`);
      return;
    }
    
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { headers: authHeader() })
        .then(res => res.json()).then(data => setCart(Array.isArray(data.items) ? data.items : []));
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      alert('Failed to update cart quantity');
    }
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
    
    if (cart.length === 0) {
      return alert('Your cart is empty');
    }
    
    try {
      // Step 1: Final stock validation before placing order
      const stockValidation = [];
      for (const item of cart) {
        const productId = item.productId || item.id;
        const product = products.find(p => String(p.id) === String(productId) || String(p._id) === String(productId));
        const availableStock = product ? product.stock || 0 : 0;
        
        if (availableStock < item.quantity) {
          stockValidation.push({
            productName: product ? product.name : `Product ${productId}`,
            requested: item.quantity,
            available: availableStock
          });
        }
      }
      
      // If any items don't have sufficient stock, show error and abort
      if (stockValidation.length > 0) {
        const errorMessage = stockValidation.map(item => 
          `${item.productName}: requested ${item.requested}, only ${item.available} available`
        ).join('\n');
        alert(`Insufficient stock for the following items:\n\n${errorMessage}\n\nPlease update your cart quantities.`);
        return;
      }
      
      const orderItems = cart.map(item => ({
        productId: item.productId || item.id,
        quantity: item.quantity
      }));
      
      // Convert structured address to string format for backend compatibility
      const addressString = `${address.fullName}\n${address.phone}\n${address.street}\n${address.city}${address.state ? ', ' + address.state : ''} ${address.postalCode}\n${address.country}${address.instructions ? '\n\nInstructions: ' + address.instructions : ''}`;
      
      // Step 2: Place the order
      const orderRes = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: addressString, 
          items: orderItems,
          total: getCartTotal(),
          stockValidation: true // Flag to backend to handle stock deduction
        })
      });
      
      if (!orderRes.ok) {
        const errorData = await orderRes.json().catch(() => ({}));
        if (orderRes.status === 409) { // Conflict - insufficient stock
          alert('Order failed: Some items are no longer available in the requested quantities. Please refresh and try again.');
        } else {
          alert(`Order failed: ${errorData.message || 'Unknown error'}`);
        }
        return;
      }
      
      // Step 3: If order successful, update stock locally for immediate UI feedback
      // This will be synced with backend on next product fetch
      const updatedProducts = products.map(product => {
        const orderItem = cart.find(item => 
          String(item.productId) === String(product.id) || 
          String(item.productId) === String(product._id) ||
          String(item.id) === String(product.id) || 
          String(item.id) === String(product._id)
        );
        
        if (orderItem) {
          return {
            ...product,
            stock: Math.max(0, (product.stock || 0) - orderItem.quantity)
          };
        }
        return product;
      });
      
      setProducts(updatedProducts);
      
      // Step 4: Refresh orders and clear cart
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, { headers: authHeader() })
        .then(res => res.json()).then(data => setOrders(normalizeOrders(data)));
      
      setCart([]);
      setAddress({});
      alert('Order placed successfully! Stock has been updated.');
      setCurrentView('orders');
      
      // Step 5: Refresh products from backend to sync stock
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`)
          .then(res => res.json())
          .then(data => setProducts(Array.isArray(data) ? data : []))
          .catch(err => console.error('Failed to refresh products:', err));
      }, 1000);
      
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Order failed due to a network error. Please try again.');
    }
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
    <div className={`min-h-screen transition-all duration-700 relative ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Modern geometric background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" className={darkMode ? 'text-white' : 'text-slate-900'} />
        </svg>
        
      </div>
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
            <aside className="hidden lg:block w-64 shadow-sm border-r min-h-screen sticky top-24 pt-16 transition-all duration-300 z-10 backdrop-blur-sm border-white/10">
              <Navigation user={user} currentView={currentView} onNav={handleNav} darkMode={darkMode} />
            </aside>
            
            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t transition-all duration-300 backdrop-blur-sm border-white/10">
              <Navigation user={user} currentView={currentView} onNav={handleNav} darkMode={darkMode} isMobile={true} />
            </div>
          </>
        )}
        
        {/* Mobile Navigation for Non-logged-in users */}
        {!user && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t transition-all duration-300 backdrop-blur-sm border-white/10">
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
        <main className={`flex-1 px-6 lg:px-12 pt-28 pb-32 relative z-10 ${
          user ? 'max-w-none' : 'max-w-none'
        }`}>
          {currentView === 'home' && (
            <div className="space-y-20">
              {/* Hero Section */}
              <section className="text-center space-y-8">
                <div className="space-y-6">
                  <h1 className={`text-5xl lg:text-7xl font-black tracking-tight transition-all duration-700 ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>
                    Premium
                    <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                      Kitchen Essentials
                    </span>
                  </h1>
                  <p className={`text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${
                    darkMode ? 'text-white/70' : 'text-black/70'
                  }`}>
                    Discover handcrafted teak wood products and premium spices that transform your cooking experience
                  </p>
                </div>
              </section>

              {/* Products Section */}
              <section className="space-y-12">
                <div className="flex items-center justify-between">
                  <div className="space-y-4">
                    <h2 className={`text-4xl font-black transition-all duration-300 ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}>
                      Our Collection
                    </h2>
                    <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white/60' 
                        : 'bg-black/5 border-black/10 text-black/60'
                    }`}>
                      <span className="text-lg font-semibold">
                        {Array.isArray(products) ? products.length : 0} Products Available
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Modern Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map(product => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
                        user={user}
                        wishlist={wishlist}
                        cart={cart}
                        onAddToCart={addToCart}
                        onToggleWishlist={toggleWishlist}
                        onUpdateQuantity={updateCartQuantity}
                        onRemoveFromCart={removeFromCart}
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
              </section>
            </div>
          )}

          {currentView === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
              loading={loading}
              darkMode={darkMode}
            />
          )}
          {currentView === 'register' && (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
              loading={loading}
              darkMode={darkMode}
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
              darkMode={darkMode}
            />
          )}
          {currentView === 'orders' && user && <OrdersView orders={orders} products={products} darkMode={darkMode} />}
          {currentView === 'wishlist' && user && (
            <WishlistView
              products={products}
              wishlist={wishlist}
              user={user}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              darkMode={darkMode}
            />
          )}
          {currentView === 'profile' && user && <ProfileView user={user} darkMode={darkMode} />}
          {currentView === 'about' && <AboutUs darkMode={darkMode} />}
          {currentView === 'contact' && <ContactUs darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
};

export default TeakSpiceStore;
