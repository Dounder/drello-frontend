import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { apiRest, axios } from 'src/boot';
import { useAuthStore } from 'src/stores/auth.store';
import { AuthData } from '../interfaces/auth.interface';

interface LoginForm {
  username: string;
  password: string;
}

const login = async (loginForm: LoginForm): Promise<AuthData> => {
  const { data } = await apiRest.post<AuthData>('/auth/sign_in', loginForm);
  return data;
};

const useAuth = () => {
  const queryClient = useQueryClient();
  const store = useAuthStore();
  const { getUser, getToken, getError, getErrorMessage } = storeToRefs(store);

  const loginMutation = useMutation(login, {
    onSuccess: (authResponse) => {
      queryClient.invalidateQueries({ queryKey: ['auth'], exact: false });
      queryClient.refetchQueries(['auth'], { exact: false });
      queryClient.setQueryData(['auth', authResponse.token], authResponse.token);
      store.setAuthData(authResponse);
      store.setError(null);
    },
    onError: (error) => {
      axios.isAxiosError(error)
        ? store.setError(error.response?.data)
        : store.setError({ error: 'Unexpected Error', message: `${error}`, statusCode: 0 });
    },
  });

  return {
    //* Props
    getUser,
    getToken,
    getError,
    getErrorMessage,
    //? Methods
    loginMutation,
  };
};

export default useAuth;
