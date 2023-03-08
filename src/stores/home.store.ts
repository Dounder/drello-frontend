import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('global', () => {
  const isDrawerOpen = ref(true);

  return {
    //? Props
    isDrawerOpen,

    //* Getters

    //! Actions
    toggleDrawer: () => (isDrawerOpen.value = !isDrawerOpen.value),
  };
});
