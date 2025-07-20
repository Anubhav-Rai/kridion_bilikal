import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, AlertCircle, Check } from 'lucide-react';

const RegisterForm = ({ onRegister, onSwitchToLogin, loading, darkMode }) => {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's between 10-15 digits (international format)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /(?=.*[a-z])/.test(password) && 
           /(?=.*[A-Z])/.test(password) && 
           /(?=.*\d)/.test(password);
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    if (phoneNumber.length <= 10) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return `+${phoneNumber.slice(0, -10)} ${phoneNumber.slice(-10, -7)}-${phoneNumber.slice(-7, -4)}-${phoneNumber.slice(-4)}`;
  };

  // Handle field changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFields({ ...fields, [name]: processedValue });
    
    // Real-time validation
    if (touched[name] || value.length > 0) {
      validateField(name, processedValue);
    }
  };

  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        if (!value) error = 'Full name is required';
        else if (!validateName(value)) error = 'Please enter a valid name (letters only, min 2 characters)';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!validatePhone(value)) error = 'Please enter a valid phone number (10-15 digits)';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value)) error = 'Password must be 8+ characters with uppercase, lowercase, and number';
        break;
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  // Handle field blur
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, fields[fieldName]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, password: true });
    
    // Validate all fields
    Object.keys(fields).forEach(field => {
      validateField(field, fields[field]);
    });
    
    // Check if form is valid
    const hasErrors = Object.keys(fields).some(field => {
      validateField(field, fields[field]);
      return errors[field];
    });
    
    if (!hasErrors && isFormValid) {
      onRegister(fields);
    }
  };

  const isFormValid = validateName(fields.name) && 
                     validateEmail(fields.email) && 
                     validatePhone(fields.phone) && 
                     validatePassword(fields.password);

  // Password strength indicator
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(fields.password);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-6">
        <h1 className={`text-5xl lg:text-6xl font-black tracking-tight transition-all duration-700 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          Join
          <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            KRIDION
          </span>
        </h1>
        <p className={`text-xl leading-relaxed ${
          darkMode ? 'text-white/70' : 'text-black/70'
        }`}>
          Create your account and start shopping premium kitchen essentials
        </p>
      </div>

      {/* Register Form */}
      <div className={`rounded-3xl backdrop-blur-xl border transition-all duration-500 p-12 ${
        darkMode 
          ? 'bg-white/5 border-white/10' 
          : 'bg-black/5 border-black/10'
      }`}>
        <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              name="name"
              type="text"
              value={fields.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder="John Doe"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.name 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              required
            />
            {validateName(fields.name) && fields.name && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Check className="h-5 w-5 text-green-400" />
              </div>
            )}
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="john@example.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.email 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              required
            />
            {validateEmail(fields.email) && fields.email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Check className="h-5 w-5 text-green-400" />
              </div>
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className={`h-5 w-5 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              name="phone"
              type="tel"
              value={fields.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              placeholder="123-456-7890"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.phone 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              required
            />
            {validatePhone(fields.phone) && fields.phone && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Check className="h-5 w-5 text-green-400" />
              </div>
            )}
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              value={fields.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              placeholder="Create a strong password"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.password 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {fields.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded ${
                      i < passwordStrength 
                        ? passwordStrength <= 2 ? 'bg-red-400' : passwordStrength === 3 ? 'bg-yellow-400' : 'bg-green-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs ${
                passwordStrength <= 2 ? 'text-red-600' : passwordStrength === 3 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Good' : 'Strong'} password
              </p>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
            loading || !isFormValid
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
        </form>
        
        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-lg ${
            darkMode ? 'text-white/60' : 'text-black/60'
          }`}>
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent hover:from-emerald-400 hover:to-teal-500 transition-all duration-300"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
