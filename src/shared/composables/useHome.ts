import { storeToRefs } from 'pinia';
import { useHomeStore } from './../../stores/home.store';
const useHome = () => {
  const store = useHomeStore();
  const { isDrawerOpen, pageTitle, windowTitle } = storeToRefs(store);

  isDrawerOpen.value = window.innerWidth >= 1024;

  return {
    //* Props
    isDrawerOpen,
    pageTitle,
    windowTitle,
    //! Getters
    //? Methods
    store,
  };
};

export default useHome;
