import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('global', () => {
  const isDrawerOpen = ref(true);
  const windowTitle = ref('Drello');
  const pageTitle = ref('Home');

  return {
    //? Props
    isDrawerOpen,
    windowTitle,
    pageTitle,

    //* Getters

    //! Actions
    toggleDrawer: () => (isDrawerOpen.value = !isDrawerOpen.value),
    setPageTitle: (text: string) => (pageTitle.value = text),
    setWindowTitle: (text: string) => (windowTitle.value = text),
  };
});
