
import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  open: boolean;
  onClose: () => void;
  autoHideMs?: number;
};

export default function Toast({
  message,
  type = 'info',
  open,
  onClose,
  autoHideMs = 4000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(id);
  }, [open, autoHideMs, onClose]);

  if (!open) return null;

  const base =
    'fixed top-4 left-1/2 -translate-x-1/2 z-50 min-w-72 max-w-[90vw] border  rounded-md px-4 py-3 shadow-lg text-sm';
  const byType: Record<string, string> = {
    success: 'bg-green-400 text-white-400 border-green-400 ',
    error: 'bg-red-200 text-red-700 border-red-400',
    info: 'bg-green-100 text-white-700 border-green-400',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${base} ${byType[type]}`}
    >
      <div className="flex items-start gap-3">
        <span className="flex-1">{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="opacity-85 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

