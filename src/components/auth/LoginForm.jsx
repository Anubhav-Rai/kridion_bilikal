import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Spinner from '../ui/Spinner';
import { isValidEmail, isValidLoginPassword } from '../../utils/validation';

const LoginForm = ({ onSubmit, submitting, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({});

  const emailError = !email
    ? 'Email is required'
    : !isValidEmail(email)
      ? 'Please enter a valid email address'
      : '';
  const passwordError = !password
    ? 'Password is required'
    : !isValidLoginPassword(password)
      ? 'Password must be at least 6 characters'
      : '';
  const isFormValid = !emailError && !passwordError;

  const visibleEmailError = touched.email ? emailError : '';
  const visiblePasswordError = touched.password ? passwordError : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (isFormValid) onSubmit(email, password);
  };

  return (
    <div className="mx-auto max-w-sm py-6">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="text-2xl font-normal text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-muted">Sign in to your account to continue shopping.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="login-email" className="label">Email Address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@email.com"
            autoComplete="email"
            className={`field ${visibleEmailError ? 'border-accent' : ''}`}
          />
          {visibleEmailError && <p className="mt-1.5 text-xs text-accent">{visibleEmailError}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className="label">Password</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="Your password"
              autoComplete="current-password"
              className={`field pr-10 ${visiblePasswordError ? 'border-accent' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
            >
              {showPass ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          </div>
          {visiblePasswordError && <p className="mt-1.5 text-xs text-accent">{visiblePasswordError}</p>}
        </div>

        <button type="submit" disabled={submitting || !isFormValid} className="btn btn-primary w-full">
          {submitting && <Spinner size={16} className="text-paper" />}
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-sm text-muted">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-ink underline underline-offset-2 hover:no-underline">
          Create one
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
