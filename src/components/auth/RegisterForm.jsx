import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Spinner from '../ui/Spinner';
import {
  isValidName,
  isValidEmail,
  isValidPhone,
  isStrongPassword,
  passwordStrength,
  formatPhoneNumber,
} from '../../utils/validation';

const VALIDATORS = {
  name: { test: isValidName, message: 'Enter a valid name (letters only, min 2 characters)' },
  email: { test: isValidEmail, message: 'Enter a valid email address' },
  phone: { test: isValidPhone, message: 'Enter a valid phone number (10–15 digits)' },
  password: { test: isStrongPassword, message: '8+ characters with uppercase, lowercase, and a number' },
};
const LABELS = { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', password: 'Password' };
const TYPES = { name: 'text', email: 'email', phone: 'tel', password: 'password' };
const AUTOCOMPLETE = { name: 'name', email: 'email', phone: 'tel', password: 'new-password' };
const PLACEHOLDERS = { name: 'John Doe', email: 'you@email.com', phone: '123-456-7890', password: 'Create a strong password' };

const RegisterForm = ({ onSubmit, submitting, onSwitchToLogin }) => {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({});

  const errorFor = (key) => {
    const value = fields[key];
    if (!value) return `${LABELS[key]} is required`;
    return VALIDATORS[key].test(value) ? '' : VALIDATORS[key].message;
  };
  const visibleError = (key) => (touched[key] ? errorFor(key) : '');
  const isFormValid = Object.keys(VALIDATORS).every((k) => VALIDATORS[k].test(fields[k]));
  const strength = passwordStrength(fields.password);
  const strengthLabel = strength <= 2 ? 'Weak' : strength === 3 ? 'Good' : 'Strong';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: name === 'phone' ? formatPhoneNumber(value) : value }));
  };
  const handleBlur = (key) => setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, password: true });
    if (isFormValid) onSubmit(fields);
  };

  const renderField = (key) => {
    const error = visibleError(key);
    const isPassword = key === 'password';
    return (
      <div key={key}>
        <label htmlFor={`reg-${key}`} className="label">{LABELS[key]}</label>
        <div className="relative">
          <input
            id={`reg-${key}`}
            name={key}
            type={isPassword ? (showPass ? 'text' : 'password') : TYPES[key]}
            value={fields[key]}
            onChange={handleChange}
            onBlur={() => handleBlur(key)}
            placeholder={PLACEHOLDERS[key]}
            autoComplete={AUTOCOMPLETE[key]}
            className={`field ${isPassword ? 'pr-10' : ''} ${error ? 'border-accent' : ''}`}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
            >
              {showPass ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          )}
        </div>

        {isPassword && fields.password && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-0.5 flex-1 ${i < Math.min(strength, 4) ? 'bg-ink' : 'bg-line'}`} />
              ))}
            </div>
            <p className="mt-1 text-xs text-muted">{strengthLabel} password</p>
          </div>
        )}

        {error && <p className="mt-1.5 text-xs text-accent">{error}</p>}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-sm py-6">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="text-2xl font-normal text-ink">Create account</h1>
      <p className="mt-2 text-sm text-muted">Join KRIDION and start shopping premium essentials.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        {['name', 'email', 'phone', 'password'].map(renderField)}

        <button type="submit" disabled={submitting || !isFormValid} className="btn btn-primary w-full">
          {submitting && <Spinner size={16} className="text-paper" />}
          {submitting ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-8 text-sm text-muted">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-ink underline underline-offset-2 hover:no-underline">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
