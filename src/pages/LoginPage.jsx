import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, submitting } = useAuth();
  const toast = useToast();
  const from = location.state?.from || '/';

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (email, password) => {
    try {
      const u = await login(email, password);
      toast.success(`Welcome back${u?.name ? `, ${u.name}` : ''}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      submitting={submitting}
      onSwitchToRegister={() => navigate('/register')}
    />
  );
};

export default LoginPage;
