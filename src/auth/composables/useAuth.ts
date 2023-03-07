import { useQueryClient } from '@tanstack/vue-query';

const login = (data: { username: string; password: string }) => {};

const useAuth = () => {
  const queryClient = useQueryClient();

  return {
    //* Props
    //! Getters
    //? Methods
  };
};

export default useAuth;
