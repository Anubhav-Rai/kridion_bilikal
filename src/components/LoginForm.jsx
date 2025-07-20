import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginForm = ({ onLogin, onSwitchToRegister, loading, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle field changes with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched.email || value.length > 0) {
      if (!value) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (touched.password || value.length > 0) {
      if (!value) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (!validatePassword(value)) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') {
      handleEmailChange({ target: { value: email } });
    } else if (field === 'password') {
      handlePasswordChange({ target: { value: password } });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Validate all fields
    const emailError = !email ? 'Email is required' : !validateEmail(email) ? 'Please enter a valid email address' : '';
    const passwordError = !password ? 'Password is required' : !validatePassword(password) ? 'Password must be at least 6 characters' : '';
    
    setErrors({ email: emailError, password: passwordError });
    
    // Submit if no errors
    if (!emailError && !passwordError) {
      onLogin(email, password);
    }
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-6">
        <h1 className={`text-5xl lg:text-6xl font-black tracking-tight transition-all duration-700 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          Welcome
          <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Back
          </span>
        </h1>
        <p className={`text-xl leading-relaxed ${
          darkMode ? 'text-white/70' : 'text-black/70'
        }`}>
          Sign in to your account to continue shopping
        </p>
      </div>

      {/* Login Form */}
      <div className={`rounded-3xl backdrop-blur-xl border transition-all duration-500 p-12 ${
        darkMode 
          ? 'bg-white/5 border-white/10' 
          : 'bg-black/5 border-black/10'
      }`}>
      
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Field */}
          <div className="space-y-3">
            <label className={`block text-lg font-bold ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className={`h-6 w-6 transition-colors duration-300 ${
                  errors.email 
                    ? 'text-red-500' 
                    : darkMode 
                      ? 'text-white/40' 
                      : 'text-black/40'
                }`} />
              </div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                placeholder="john@example.com"
                className={`w-full pl-14 pr-4 py-4 text-lg rounded-2xl backdrop-blur-xl border transition-all duration-300 focus:scale-[1.02] ${
                  errors.email 
                    ? darkMode
                      ? 'border-red-500/50 bg-red-500/10 text-red-400 placeholder-red-400/50' 
                      : 'border-red-500/50 bg-red-500/10 text-red-600 placeholder-red-500/50'
                    : darkMode
                      ? 'border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-white/40 hover:border-white/30'
                      : 'border-black/20 bg-black/5 text-black placeholder-black/40 focus:border-black/40 hover:border-black/30'
                }`}
                required
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

          {/* Password Field */}
          <div className="space-y-3">
            <label className={`block text-lg font-bold ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className={`h-6 w-6 transition-colors duration-300 ${
                  errors.password 
                    ? 'text-red-500' 
                    : darkMode 
                      ? 'text-white/40' 
                      : 'text-black/40'
                }`} />
              </div>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                placeholder="Enter your password"
                className={`w-full pl-14 pr-16 py-4 text-lg rounded-2xl backdrop-blur-xl border transition-all duration-300 focus:scale-[1.02] ${
                  errors.password 
                    ? darkMode
                      ? 'border-red-500/50 bg-red-500/10 text-red-400 placeholder-red-400/50' 
                      : 'border-red-500/50 bg-red-500/10 text-red-600 placeholder-red-500/50'
                    : darkMode
                      ? 'border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-white/40 hover:border-white/30'
                      : 'border-black/20 bg-black/5 text-black placeholder-black/40 focus:border-black/40 hover:border-black/30'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                }`}
              >
                {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 flex items-center gap-2 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-4 px-6 rounded-2xl font-black text-xl transition-all duration-500 hover:scale-105 active:scale-95 ${
            loading || !isFormValid
                ? darkMode
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-black/10 text-black/30 cursor-not-allowed'
                : darkMode 
                  ? 'bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/20' 
                  : 'bg-black text-white hover:bg-black/90 shadow-2xl shadow-black/20'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${
                  darkMode ? 'border-black' : 'border-white'
                }`}></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-lg ${
            darkMode ? 'text-white/60' : 'text-black/60'
          }`}>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent hover:from-emerald-400 hover:to-teal-500 transition-all duration-300"
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
