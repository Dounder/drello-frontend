import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthResponse, User } from '../interfaces/auth.interface';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  return {
    //? Props
    user,
    token,

    //* Getters
    isLoggedIn: computed(() => !!token.value),

    //! Actions
    setCredentials: (creds: AuthResponse | undefined | null) => {
      if (creds === undefined || creds === null) {
        user.value = null;
        token.value = null;
        return;
      }

      user.value = creds.user;
      token.value = creds.token;
    },
    logout: () => {
      user.value = null;
      token.value = null;
    },
  };
});
