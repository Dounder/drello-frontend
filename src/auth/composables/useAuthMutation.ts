import { useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';

import { api } from 'src/boot/axios';
import { AuthResponse } from '../interfaces/auth.interface';
import { ApiError } from 'src/shared/interfaces/api-response.interface';
import { ApiException } from 'src/shared/helpers/custom-error.helper';
import { useAuthStore } from '../store/auth.store';

interface Args {
  username: string;
  password: string;
}

const login = async (args: Args): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/sign_in', args);

    return data;
  } catch (error) {
    let errorMsg = { message: 'Unexpected error', error: 'unexpected_error' };
    if (axios.isAxiosError(error)) errorMsg = error.response?.data;

    throw ApiException(errorMsg);
  }
};

const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const { setCredentials } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (loginForm: Args) => login(loginForm),
    onSuccess: (data: AuthResponse) => {
      queryClient.invalidateQueries({ queryKey: ['auth', data.user.id], exact: false });
      queryClient.setQueryData(['auth', data.user.id], data);

      setCredentials(data);

      return data;
    },
    onError: (apiError: ApiError) => {
      return apiError;
    },
  });
  return {
    loginMutation,
  };
};

export default useAuthMutation;
