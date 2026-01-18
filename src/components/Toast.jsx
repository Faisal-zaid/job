import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toast = {
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    warning: (message, duration) => addToast(message, "warning", duration),
    info: (message, duration) => addToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Icons
const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

// Toast Colors
const toastColors = {
  success: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    icon: "bg-emerald-500/20",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    icon: "bg-red-500/20",
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    icon: "bg-amber-500/20",
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    icon: "bg-blue-500/20",
  },
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const Icon = toastIcons[toast.type];
  const colors = toastColors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className={`
        flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border
        ${colors.bg} ${colors.border}
        max-w-sm w-full
      `}>
      <div className={`p-2 rounded-xl ${colors.icon}`}>
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-bold ${colors.text} capitalize`}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors">
        <X className="w-4 h-4 text-slate-400 hover:text-white" />
      </button>
    </motion.div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Simple Toast Hook for easy usage without provider
let toastInstance = null;

export const setToastInstance = (fn) => {
  toastInstance = fn;
};

export const showToast = (message, type = "info", duration = 4000) => {
  if (toastInstance) {
    toastInstance(message, type, duration);
  } else {
    console.warn("ToastProvider not found. Using console fallback:");
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
};

export default ToastProvider;
