
import { useCallback, useState } from 'react';

type ToastState = {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
};

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    type: 'info',
  });

  const show = useCallback(
    (message: string, type: ToastState['type'] = 'info') => {
      setToast({ open: true, message, type });
    },
    []
  );

  const hide = useCallback(() => setToast(t => ({ ...t, open: false })), []);

  return { toast, show, hide };
}

