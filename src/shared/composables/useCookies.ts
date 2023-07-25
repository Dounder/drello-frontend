import CryptoJS from 'crypto-js';
import useConfig from './useConfig';
import { useQuasar } from 'quasar';
import { AuthResponse, User } from 'src/auth/interfaces/auth.interface';

const { SECRET_KEY } = useConfig();

const useCookies = () => {
  const { cookies } = useQuasar();

  const encryptCredentials = (username: string, password: string) => {
    const encryptedUsername = CryptoJS.AES.encrypt(username, SECRET_KEY).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

    return { encryptedUsername, encryptedPassword };
  };

  const decryptCredentials = (encryptedUsername: string, encryptedPassword: string) => {
    const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    return { decryptedUsername, decryptedPassword };
  };

  return {
    //* Props
    //! Getters
    //? Methods
    saveCredentials: (username: string, password: string) => {
      console.log('saveCredentials');
      const { encryptedUsername, encryptedPassword } = encryptCredentials(username, password);

      cookies.set('login', JSON.stringify({ user: encryptedUsername, pass: encryptedPassword }), { expires: 365 });
    },
    getCredentials: () => {
      const loginData = cookies.get('login') as { user: string; pass: string };

      if (loginData) {
        const { user, pass } = loginData;

        const { decryptedUsername, decryptedPassword } = decryptCredentials(user, pass);

        return { username: decryptedUsername, password: decryptedPassword };
      }
    },
    saveUserData: (data: AuthResponse) => {
      cookies.set('user', JSON.stringify(data.user), { expires: 365 });
      cookies.set('token', data.token, { expires: 365 });
    },
    getToken: (): string | null => cookies.get('token'),
    getUser: (): User | null => cookies.get('user'),
    removeCredentials: () => {
      cookies.remove('login');
      cookies.remove('user');
      cookies.remove('token');
    },
  };
};

export default useCookies;
