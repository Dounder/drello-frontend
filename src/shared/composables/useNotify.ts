import { useQuasar } from 'quasar';

type notifyType = 'positive' | 'negative' | 'warning' | 'info';
type notifyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | undefined;

interface Args {
  type?: notifyType;
  message: string;
  position?: notifyPosition;
}

const useNotify = () => {
  const { notify } = useQuasar();

  return {
    predefined: ({ type = 'info', message, position = 'bottom-left' }: Args) => {
      notify({ type, message, progress: true, position });
    },
  };
};

export default useNotify;
