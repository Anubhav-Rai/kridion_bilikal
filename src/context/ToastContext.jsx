import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ToastContainer from '../components/ui/ToastContainer';

const ToastContext = createContext(null);

// Module-level counter keeps toast ids unique without Date.now()/Math.random().
let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message, duration = 4000) => {
      const id = ++nextId;
      setToasts((current) => [...current, { id, type, message }]);
      if (duration) setTimeout(() => remove(id), duration);
      return id;
    },
    [remove],
  );

  // Stable dispatcher object — consumers that only fire toasts never re-render
  // when the visible toast list changes (the provider renders the list itself).
  const api = useMemo(
    () => ({
      push,
      remove,
      success: (message, duration) => push('success', message, duration),
      error: (message, duration) => push('error', message, duration ?? 6000),
      info: (message, duration) => push('info', message, duration),
    }),
    [push, remove],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastContainer toasts={toasts} onClose={remove} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};
