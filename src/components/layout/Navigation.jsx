import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, Heart, ShoppingBag, User } from 'lucide-react';

const PRIMARY = [
  { to: '/', label: 'Products', Icon: Package, end: true },
  { to: '/orders', label: 'Orders', Icon: ShoppingBag },
  { to: '/wishlist', label: 'Wishlist', Icon: Heart },
  { to: '/profile', label: 'Profile', Icon: User },
];
const SECONDARY = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const desktopClass = ({ isActive }) =>
  `block py-1.5 text-sm tracking-wide transition-colors duration-150 ${
    isActive ? 'text-ink' : 'text-muted hover:text-ink'
  }`;

const mobileClass = ({ isActive }) =>
  `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] tracking-wide transition-colors duration-150 ${
    isActive ? 'text-ink' : 'text-muted'
  }`;

const Navigation = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <nav className="flex items-stretch">
        {PRIMARY.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={mobileClass}>
            <Icon size={18} strokeWidth={1.5} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <nav>
      <p className="eyebrow mb-4">Menu</p>
      <div className="space-y-1">
        {PRIMARY.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={desktopClass}>
            {label}
          </NavLink>
        ))}
      </div>
      <div className="my-5 border-t border-line" />
      <div className="space-y-1">
        {SECONDARY.map(({ to, label }) => (
          <NavLink key={to} to={to} className={desktopClass}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
