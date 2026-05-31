import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Package, Info, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Navigation from './Navigation';

const GUEST_ITEMS = [
  { to: '/', label: 'Products', Icon: Package, end: true },
  { to: '/about', label: 'About', Icon: Info },
  { to: '/contact', label: 'Contact', Icon: Phone },
];

const guestMobileClass = ({ isActive }) =>
  `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] tracking-wide transition-colors duration-150 ${
    isActive ? 'text-ink' : 'text-muted'
  }`;

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="mx-auto flex max-w-content gap-10 px-5 sm:px-8">
        {user && (
          <aside className="hidden w-44 flex-shrink-0 lg:block">
            <div className="sticky top-16 py-10">
              <Navigation />
            </div>
          </aside>
        )}
        <main className="min-w-0 flex-1 py-10 pb-28 lg:pb-16">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-paper lg:hidden">
        {user ? (
          <Navigation isMobile />
        ) : (
          <nav className="flex items-stretch">
            {GUEST_ITEMS.map(({ to, label, Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={guestMobileClass}>
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
