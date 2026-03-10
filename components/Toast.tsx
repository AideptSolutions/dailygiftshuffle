'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, onDismiss, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [onDismiss, duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg animate-bounce-in"
    >
      {message}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => setToast(message);
  const dismissToast = () => setToast(null);

  const ToastElement = toast ? (
    <Toast message={toast} onDismiss={dismissToast} />
  ) : null;

  return { showToast, ToastElement };
}
