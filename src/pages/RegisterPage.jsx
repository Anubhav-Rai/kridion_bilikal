import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, register, submitting } = useAuth();
  const toast = useToast();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (fields) => {
    try {
      const u = await register(fields);
      toast.success(`Welcome to KRIDION${u?.name ? `, ${u.name}` : ''}!`);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      submitting={submitting}
      onSwitchToLogin={() => navigate('/login')}
    />
  );
};

export default RegisterPage;
