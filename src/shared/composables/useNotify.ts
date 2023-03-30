import { useQuasar } from 'quasar';
import { notifyPosition } from '../interfaces/types';

interface Args {
  message: string;
  position?: notifyPosition;
  type?: 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';
}

const useNotify = () => {
  const $q = useQuasar();
  return {
    notify: ({ message, type = 'positive', position = 'top-right' }: Args) => $q.notify({ type, message, position }),
  };
};

export default useNotify;
