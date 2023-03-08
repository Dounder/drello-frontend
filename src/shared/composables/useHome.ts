import { storeToRefs } from 'pinia';
import { useHomeStore } from './../../stores/home.store';
const useHome = () => {
  const store = useHomeStore();
  const { isDrawerOpen } = storeToRefs(store);

  isDrawerOpen.value = window.innerWidth >= 1024;

  return {
    //* Props
    isDrawerOpen,
    //! Getters
    //? Methods
    store,
  };
};

export default useHome;
