import { useCookies } from 'src/shared/composables';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth.store';

const useAuth = () => {
  const store = useAuthStore();
  const { removeCredentials } = useCookies();
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
    logout: () => {
      store.logout();
      removeCredentials();
    },
  };
};

export default useAuth;
