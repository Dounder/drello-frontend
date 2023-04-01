import { useQuasar } from 'quasar';
import { notifyPosition } from '../interfaces/types';

interface NotifyOption {
  message: string;
  position?: notifyPosition;
  type?: 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';
}

interface ConfirmOption {
  message: string;
  title?: string;
}

const useNotify = () => {
  const $q = useQuasar();
  return {
    notify: ({ message, type = 'positive', position = 'top-right' }: NotifyOption) =>
      $q.notify({ type, message, position }),

    confirm: ({ message, title = 'Confirm' }: ConfirmOption) =>
      $q.dialog({
        title,
        message,
        cancel: true,
        persistent: true,
        dark: true,
        ok: {
          standard: true,
          color: 'negative',
        },
      }),
  };
};

export default useNotify;
