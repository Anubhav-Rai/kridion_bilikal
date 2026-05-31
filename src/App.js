import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Layout from './components/layout/Layout';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Provider order: Theme -> Toast -> Auth -> Store. Store depends on Auth (user)
// and Toast (feedback), so they must sit above it.
const AppProviders = ({ children }) => (
  <ToastProvider>
    <AuthProvider>
      <StoreProvider>{children}</StoreProvider>
    </AuthProvider>
  </ToastProvider>
);

const protectedRoute = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/orders" element={protectedRoute(<OrdersPage />)} />
              <Route path="/wishlist" element={protectedRoute(<WishlistPage />)} />
              <Route path="/profile" element={protectedRoute(<ProfilePage />)} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
