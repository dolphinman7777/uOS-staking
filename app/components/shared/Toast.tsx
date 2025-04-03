import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  autoClose?: boolean;
}

export const Toast = ({ message, type, onClose, autoClose = true }: ToastProps) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const Icon = type === 'success' ? CheckCircleIcon : ExclamationCircleIcon;
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`fixed bottom-4 right-4 z-50 rounded-lg border ${borderColor} ${bgColor} p-4 shadow-lg`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <p className={`text-sm ${textColor}`}>{message}</p>
        <button
          onClick={onClose}
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 ${textColor} hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center`}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}; 