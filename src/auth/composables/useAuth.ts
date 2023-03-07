import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth.store';

const useAuth = () => {
  const store = useAuthStore();
  const { getUser, getToken, getError, getErrorMessage, isAuthenticated } = storeToRefs(store);

  return {
    //* Props
    getUser,
    getToken,
    getError,
    getErrorMessage,
    isAuthenticated,
    //? Methods
    authStore: store,
  };
};

export default useAuth;
