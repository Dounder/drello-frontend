import { Buffer } from 'buffer';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

import { useCookies } from 'src/shared/composables';
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';

const useAuth = () => {
  const store = useAuthStore();
  const { user, isLoggedIn, token } = storeToRefs(store);
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
    store,
    login,
    vertical,
    user,
    isLoggedIn,
    token,

    //? Methods
    logout: () => {
      store.logout();
      removeCredentials();
    },
    isTokenExpired: (token: string) => {
      const [, payloadBase64] = token.split('.'); // Get the payload part of the token
      const payloadDecoded = Buffer.from(payloadBase64, 'base64').toString('utf-8'); // Decode the Base64 payload
      const payload = JSON.parse(payloadDecoded); // Parse the JSON payload and return it as an object
      const currentTime = Math.floor(Date.now() / 1000); // Current time in second

      return payload.exp && payload.exp < currentTime;
    },
  };
};

export default useAuth;
