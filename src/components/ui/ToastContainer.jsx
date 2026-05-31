import React from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

// Quiet, flat toasts: white surface, hairline border, a thin coloured left rule.
const CONFIG = {
  success: { Icon: Check, bar: 'border-l-ink', icon: 'text-ink' },
  error: { Icon: AlertCircle, bar: 'border-l-accent', icon: 'text-accent' },
  info: { Icon: Info, bar: 'border-l-muted', icon: 'text-muted' },
};

const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[100] flex w-[min(92vw,22rem)] flex-col gap-2">
      {toasts.map(({ id, type, message }) => {
        const { Icon, bar, icon } = CONFIG[type] ?? CONFIG.info;
        return (
          <div
            key={id}
            role="status"
            className={`animate-toast-in pointer-events-auto flex items-start gap-3 border border-l-2 border-line ${bar} bg-surface px-4 py-3 shadow-sm`}
          >
            <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${icon}`} />
            <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-ink">{message}</p>
            <button
              type="button"
              onClick={() => onClose(id)}
              aria-label="Dismiss notification"
              className="text-muted transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
