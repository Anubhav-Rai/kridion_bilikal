import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import logo from '../../assets/kridion-logo.png';

const navLinkClass = ({ isActive }) =>
  `text-sm tracking-wide transition-colors duration-150 ${
    isActive ? 'text-ink' : 'text-muted hover:text-ink'
  }`;

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-6 w-auto" />
          <span className="text-base font-medium tracking-[0.18em] text-ink">KRIDION</span>
          <span className="hidden text-[10px] tracking-[0.2em] text-muted sm:inline">AGRO</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {!user && (
            <nav className="hidden items-center gap-6 sm:flex">
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>
          )}

          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-ink transition-colors duration-150 hover:text-muted"
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <span className="min-w-[1ch] text-sm tabular-nums">{cartCount > 0 ? cartCount : ''}</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-muted sm:inline">{user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm tracking-wide text-muted transition-colors duration-150 hover:text-ink"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm tracking-wide text-muted transition-colors duration-150 hover:text-ink"
              >
                Login
              </button>
              <button type="button" onClick={() => navigate('/register')} className="btn btn-primary px-4 py-2">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
