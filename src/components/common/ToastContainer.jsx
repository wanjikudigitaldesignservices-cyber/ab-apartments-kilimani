import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={19} className="toast-icon text-emerald" />;
      case 'warning':
        return <AlertTriangle size={19} className="toast-icon text-gold" />;
      case 'error':
        return <XCircle size={19} className="toast-icon text-rose" />;
      case 'info':
      default:
        return <Info size={19} className="toast-icon text-blue" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type} animate-fade-in`}>
          <div className="toast-icon-wrapper">
            {getIcon(toast.type)}
          </div>
          <div className="toast-content">
            <h4 className="toast-title">{toast.title}</h4>
            <p className="toast-message">{toast.message}</p>
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
