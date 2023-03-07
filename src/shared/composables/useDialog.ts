import { useQuasar } from 'quasar';

const useDialog = () => {
  const $q = useQuasar();

  return {
    //? Methods
    onError: (title: string, message: string) => $q.dialog({ title, message }),
  };
};

export default useDialog;
