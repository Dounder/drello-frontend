import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api, axios } from 'src/boot/api';
import { AuthData } from '../interfaces/auth.interface';
import useAuth from './useAuth';

interface LoginForm {
  username: string;
  password: string;
}

const login = async (loginForm: LoginForm): Promise<AuthData> => {
  const { data } = await api.post<AuthData>('/auth/sign_in', loginForm);
  return data;
};

const useAuthMutation = () => {
  const { store } = useAuth();
  const queryClient = useQueryClient();

  const loginMutation = useMutation(login, {
    onSuccess: (authResponse) => {
      queryClient.invalidateQueries({ queryKey: ['auth'], exact: false });
      queryClient.refetchQueries(['auth'], { exact: false });
      queryClient.setQueryData(['auth', authResponse.user?.id], authResponse);
      store.setAuthData(authResponse);
      store.setError(null);
    },
    onError: (error) => {
      axios.isAxiosError(error)
        ? store.setError(error.response?.data)
        : store.setError({ error: 'Unexpected Error', message: `${error}`, statusCode: 0 });
    },
  });

  const updateAuthData = (authData: AuthData) => {
    queryClient.setQueryData(['auth', authData.user?.id], authData);
  };

  return {
    loginMutation,
    updateAuthData,
  };
};

export default useAuthMutation;
