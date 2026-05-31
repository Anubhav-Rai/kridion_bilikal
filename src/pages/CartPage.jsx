import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { findProduct, formatPrice, getLineItemId, getStock } from '../utils/product';

const COUNTRIES = [
  ['US', 'United States'], ['CA', 'Canada'], ['GB', 'United Kingdom'], ['AU', 'Australia'],
  ['DE', 'Germany'], ['FR', 'France'], ['IT', 'Italy'], ['ES', 'Spain'], ['NL', 'Netherlands'],
  ['BE', 'Belgium'], ['CH', 'Switzerland'], ['AT', 'Austria'], ['SE', 'Sweden'], ['NO', 'Norway'],
  ['DK', 'Denmark'], ['FI', 'Finland'], ['IE', 'Ireland'], ['PT', 'Portugal'], ['GR', 'Greece'],
  ['PL', 'Poland'], ['CZ', 'Czech Republic'], ['HU', 'Hungary'], ['RO', 'Romania'], ['BG', 'Bulgaria'],
  ['HR', 'Croatia'], ['SI', 'Slovenia'], ['SK', 'Slovakia'], ['LT', 'Lithuania'], ['LV', 'Latvia'],
  ['EE', 'Estonia'], ['JP', 'Japan'], ['KR', 'South Korea'], ['SG', 'Singapore'], ['HK', 'Hong Kong'],
  ['TW', 'Taiwan'], ['MY', 'Malaysia'], ['TH', 'Thailand'], ['PH', 'Philippines'], ['VN', 'Vietnam'],
  ['ID', 'Indonesia'], ['IN', 'India'], ['CN', 'China'], ['BR', 'Brazil'], ['MX', 'Mexico'],
  ['AR', 'Argentina'], ['CL', 'Chile'], ['CO', 'Colombia'], ['PE', 'Peru'], ['UY', 'Uruguay'],
  ['ZA', 'South Africa'], ['EG', 'Egypt'], ['MA', 'Morocco'], ['NG', 'Nigeria'], ['KE', 'Kenya'],
  ['GH', 'Ghana'], ['AE', 'United Arab Emirates'], ['SA', 'Saudi Arabia'], ['QA', 'Qatar'],
  ['KW', 'Kuwait'], ['BH', 'Bahrain'], ['OM', 'Oman'], ['JO', 'Jordan'], ['LB', 'Lebanon'],
  ['IL', 'Israel'], ['TR', 'Turkey'], ['RU', 'Russia'], ['UA', 'Ukraine'], ['BY', 'Belarus'],
  ['KZ', 'Kazakhstan'], ['UZ', 'Uzbekistan'], ['NZ', 'New Zealand'],
];

const REQUIRED = ['fullName', 'phone', 'street', 'city', 'postalCode', 'country'];

const buildAddressString = (a) =>
  `${a.fullName}\n${a.phone}\n${a.street}\n${a.city}${a.state ? `, ${a.state}` : ''} ${a.postalCode}\n${a.country}${a.instructions ? `\n\nInstructions: ${a.instructions}` : ''}`;

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const { cart, cartTotal, productIndex, updateCartQuantity, removeFromCart, placeOrder } = useStore();

  const [address, setAddress] = useState({});
  const [placing, setPlacing] = useState(false);
  const setField = (key) => (e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }));
  const addressComplete = REQUIRED.every((k) => address[k]);

  const handlePlaceOrder = async () => {
    if (!addressComplete) {
      toast.error('Please fill in all required address fields');
      return;
    }
    setPlacing(true);
    const ok = await placeOrder(buildAddressString(address));
    setPlacing(false);
    if (ok) {
      setAddress({});
      navigate('/orders');
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <PageHeader eyebrow="Bag" title="Cart" />
        <div className="border-t border-line py-16 text-center">
          <p className="text-sm text-ink">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted">Add some products to get started.</p>
          <button type="button" onClick={() => navigate('/')} className="btn btn-outline mt-6 px-6">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow="Bag" title="Cart" />

      {/* Items */}
      <div className="divide-y divide-line border-y border-line">
        {cart.map((item, index) => {
          const id = getLineItemId(item);
          const product = findProduct(productIndex, id);
          const stock = getStock(product);
          const canIncrease = stock > item.quantity;
          return (
            <div key={`${id}-${index}`} className="flex items-center gap-4 py-4">
              <div className="grid h-16 w-16 flex-shrink-0 place-items-center bg-sub text-2xl">
                {product ? product.image : '—'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm text-ink">
                  {product ? product.name : `Unknown product (${id})`}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{formatPrice(product ? product.price : 0)}</p>
              </div>
              <div className="flex items-center border border-line">
                <button
                  type="button"
                  onClick={() => updateCartQuantity(id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                  className="px-2.5 py-1.5 text-muted transition-colors hover:text-ink"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm tabular-nums text-ink">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => canIncrease && updateCartQuantity(id, item.quantity + 1)}
                  disabled={!canIncrease}
                  aria-label="Increase quantity"
                  className="px-2.5 py-1.5 text-muted transition-colors hover:text-ink disabled:text-line disabled:hover:text-line"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(id)}
                aria-label="Remove item"
                className="p-1 text-muted transition-colors hover:text-accent"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted">Total</span>
        <span className="text-base font-medium tabular-nums text-ink">{formatPrice(cartTotal)}</span>
      </div>

      {user ? (
        <div className="mt-10">
          <p className="eyebrow mb-5">Delivery address</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Full Name *</label>
              <input type="text" value={address.fullName || ''} onChange={setField('fullName')} className="field" placeholder="John Doe" />
            </div>
            <div>
              <label className="label">Phone Number *</label>
              <input type="tel" value={address.phone || ''} onChange={setField('phone')} className="field" placeholder="+1 234 567 8900" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Street Address *</label>
              <input type="text" value={address.street || ''} onChange={setField('street')} className="field" placeholder="123 Main Street, Apt 4B" />
            </div>
            <div>
              <label className="label">City *</label>
              <input type="text" value={address.city || ''} onChange={setField('city')} className="field" placeholder="New York" />
            </div>
            <div>
              <label className="label">State / Province</label>
              <input type="text" value={address.state || ''} onChange={setField('state')} className="field" placeholder="NY" />
            </div>
            <div>
              <label className="label">Postal Code *</label>
              <input type="text" value={address.postalCode || ''} onChange={setField('postalCode')} className="field" placeholder="10001" />
            </div>
            <div>
              <label className="label">Country *</label>
              <select value={address.country || ''} onChange={setField('country')} className="field">
                <option value="">Select Country</option>
                {COUNTRIES.map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Additional Instructions</label>
              <textarea value={address.instructions || ''} onChange={setField('instructions')} className="field resize-none" rows="2" placeholder="Delivery instructions, apartment number, etc." />
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">Worldwide delivery available — shipping is calculated based on your location.</p>
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!addressComplete || placing}
            className="btn btn-primary mt-6 w-full"
          >
            {placing ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      ) : (
        <div className="mt-10 border-t border-line pt-8 text-center">
          <p className="text-sm text-muted">Please sign in to place an order.</p>
          <button type="button" onClick={() => navigate('/login')} className="btn btn-primary mt-4 px-6">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
