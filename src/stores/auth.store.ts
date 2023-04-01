import { defineStore } from 'pinia';
import { ResponseError } from 'src/shared/interfaces';
import { computed, ref } from 'vue';
import { AuthData } from './../auth/interfaces/auth.interface';

const initialData = { user: null, token: null, error: null };

export const useAuthStore = defineStore('auth', () => {
  const authData = ref<AuthData>(initialData);

  return {
    //? Props
    authData,

    //* Getters
    getUser: computed(() => authData.value.user),
    getToken: computed(() => authData.value.token),
    getError: computed(() => authData.value.error),
    getErrorMessage: computed(() => `[${authData.value.error?.statusCode}] ${authData.value.error?.message}`),
    isAuthenticated: computed(() => !!authData.value.user),
    getRoles: computed(() => authData.value.user?.roles ?? []),

    //! Actions
    setAuthData: (auhtData: AuthData) => {
      authData.value = auhtData;
      sessionStorage.setItem('token', authData.value.token ?? '');
      sessionStorage.setItem('user', JSON.stringify(authData.value.user));
    },
    refreshData: (auhtData: AuthData) => {
      authData.value = auhtData;
      sessionStorage.setItem('token', authData.value.token ?? '');
      sessionStorage.setItem('user', JSON.stringify(authData.value.user));
    },
    setError: (responseError: ResponseError | null) => {
      authData.value.error = responseError;
    },
    deleteAuthData: () => {
      authData.value = initialData;
      sessionStorage.clear();
    },
    reloadData: () => {
      const token = sessionStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user') ?? 'null');
      if (user) authData.value = { ...initialData, user, token };
    },
  };
});
