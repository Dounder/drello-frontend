import CryptoJS from 'crypto-js';
import useConfig from './useConfig';
import { useQuasar } from 'quasar';

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
      const { encryptedUsername, encryptedPassword } = encryptCredentials(username, password);

      cookies.set('login', JSON.stringify({ user: encryptedUsername, pass: encryptedPassword }));
    },
    loadCredentials: () => {
      const loginData = cookies.get('login') as { user: string; pass: string };

      if (loginData) {
        const { user, pass } = loginData;

        const { decryptedUsername, decryptedPassword } = decryptCredentials(user, pass);

        return { decryptedUsername, decryptedPassword };
      }
    },
  };
};

export default useCookies;
