import CryptoJS from 'crypto-js';
import useConfig from './useConfig';

const { SECRET_KEY } = useConfig();

const useDecrypt = () => {
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
    encryptCredentials,
    decryptCredentials,
  };
};

export default useDecrypt;
