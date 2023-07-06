import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  return {
    //? Props
    user,

    //* Getters
    isLoggedIn: computed(() => !!user.value),

    //! Actions
  };
});
