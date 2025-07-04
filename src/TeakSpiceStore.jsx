import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductCard from './components/ProductCard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CartView from './components/CartView';
import OrdersView from './components/OrdersView';
import WishlistView from './components/WishlistView';
import ProfileView from './components/ProfileView';
import { products } from './data/products';
import CompanyInfo from './components/CompanyInfo';


const TeakSpiceStore = () => {
  // App state
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [address, setAddress] = useState('');

  // Auth Handlers (Simulated)
  const handleLogin = (email, password) => {
    if (!email || !password) return alert('Please fill all fields');
    setUser({ id: 1, name: 'John Doe', email, phone: '+91 9876543210' });
    setCurrentView('home');
  };
  const handleRegister = ({ name, email, phone, password }) => {
    if (!name || !email || !phone || !password) return alert('Please fill all fields');
    setUser({ id: 1, name, email, phone });
    setCurrentView('home');
  };
  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setWishlist([]);
    setCurrentView('home');
  };

  // Cart Handlers
  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };
  const removeFromCart = (productId) => setCart(cart.filter(item => item.id !== productId));
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist Handler
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) setWishlist(wishlist.filter(id => id !== productId));
    else setWishlist([...wishlist, productId]);
  };

  // Order Handler (Simulated)
  const placeOrder = () => {
    if (!address) return alert('Please enter delivery address');
    const newOrder = {
      id: `TK${Date.now()}`,
      items: [...cart],
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'Processing',
      customer: { ...user, address }
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    setAddress('');
    alert(`Order placed successfully! Order ID: ${newOrder.id}`);
    setCurrentView('orders');
  };

  // Navigation handler
  const handleNav = (view) => setCurrentView(view);

  // Rendering
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        <Header
          user={user}
          cartCount={getCartCount()}
          onLogout={handleLogout}
          onNav={handleNav}
          onLogin={() => setCurrentView('login')}
          onRegister={() => setCurrentView('register')}
        />
        <Navigation user={user} currentView={currentView} onNav={handleNav} />
        <main>
          {currentView === 'home' && (
            <>
              <CompanyInfo />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    user={user}
                    wishlist={wishlist}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            </>
          )}

          {currentView === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
            />
          )}
          {currentView === 'register' && (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
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
            />
          )}
          {currentView === 'orders' && user && <OrdersView orders={orders} />}
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
        </main>
      </div>
    </div>
  );
};

export default TeakSpiceStore;
