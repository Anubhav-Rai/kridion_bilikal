import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button onClick={() => onLogin(email, password)} className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">Login</button>
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account? <button onClick={onSwitchToRegister} className="text-blue-500 hover:text-blue-600 ml-1">Register here</button>
      </p>
    </div>
  );
};

export default LoginForm;
