import { onMounted, onUnmounted, reactive, ref } from 'vue';

const useAuth = () => {
  const login = reactive({ username: 'admin', password: 'Aa1234!' });
  const vertical = ref(window.innerWidth > 900);

  const getWindowWidth = () => {
    vertical.value = window.innerWidth > 900;
  };

  onMounted(() => {
    getWindowWidth();
    window.addEventListener('resize', getWindowWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', getWindowWidth);
  });

  return {
    //* Props
    login,
    vertical,
  };
};

export default useAuth;
