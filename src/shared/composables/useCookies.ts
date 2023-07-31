import { useQuasar } from 'quasar';
import { AuthResponse, User } from 'src/auth/interfaces/auth.interface';
import useDecrypt from './useDecrypt';

const useCookies = () => {
  const { cookies } = useQuasar();
  const { encryptCredentials, decryptCredentials } = useDecrypt();

  return {
    //* Props
    //! Getters
    //? Methods
    saveCredentials: (username: string, password: string) => {
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

      return null;
    },
    saveUserData: (data: AuthResponse) => {
      cookies.set('user', JSON.stringify(data.user), { expires: 365 });
      cookies.set('token', data.token, { expires: 365 });
    },
    getAuthData: (): AuthResponse | null => {
      const user = cookies.get('user') as User;
      const token = cookies.get('token') as string;

      return user && token ? { user, token } : null;
    },
    removeCredentials: () => {
      cookies.remove('login');
      cookies.remove('user');
      cookies.remove('token');
    },
  };
};

export default useCookies;
