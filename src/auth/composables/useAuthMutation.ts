import { useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { apiRest } from 'src/boot';
import { AuthData } from '../interfaces/auth.interface';
import useAuth from './useAuth';

interface LoginForm {
  username: string;
  password: string;
}

const login = async (loginForm: LoginForm): Promise<AuthData> => {
  const { data } = await apiRest.post<AuthData>('/auth/sign_in', loginForm);
  return data;
};

const useAuthMutation = () => {
  const { authStore: store } = useAuth();
  const queryClient = useQueryClient();

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
    loginMutation,
  };
};

export default useAuthMutation;
