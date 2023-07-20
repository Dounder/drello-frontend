import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const useWindow = () => {
  const breakpoint = 1180;
  const windowSize = ref(window.innerWidth);

  onMounted(() => {
    window.addEventListener('resize', () => {
      windowSize.value = window.innerWidth;
    });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
      windowSize.value = window.innerWidth;
    });
  });

  return {
    //* Props
    breakpoint,
    windowSize,
    //! Getters
    responsive: computed(() => windowSize.value < breakpoint),
    //? Methods
  };
};

export default useWindow;
