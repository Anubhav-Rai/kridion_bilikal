import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authApi, profileApi, getToken, setToken, clearToken } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true); // verifying a saved token
  const [submitting, setSubmitting] = useState(false); // login/register in flight

  // Attempt to restore the session from a stored token on first load.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setInitializing(false);
      return undefined;
    }
    let ignore = false;
    profileApi
      .get()
      .then((u) => {
        if (!ignore) setUser(u);
      })
      .catch(() => {
        clearToken(); // token expired / invalid
      })
      .finally(() => {
        if (!ignore) setInitializing(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setSubmitting(true);
    try {
      const { user: u, token } = await authApi.login(email, password);
      setToken(token);
      setUser(u);
      return u;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setSubmitting(true);
    try {
      await authApi.register(payload);
      // Backend has no token on register, so log in immediately afterwards.
      const { user: u, token } = await authApi.login(payload.email, payload.password);
      setToken(token);
      setUser(u);
      return u;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  // Used by the profile page after a successful PUT /user/profile.
  const updateUser = useCallback((u) => setUser(u), []);

  const value = useMemo(
    () => ({ user, initializing, submitting, login, register, logout, updateUser }),
    [user, initializing, submitting, login, register, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
