import { getUsersQuery } from './../helpers/user.query';
import { User } from './../../auth/interfaces/auth.interface';
import { api } from 'src/boot/api';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user.store';
import { GqlResponse } from 'src/shared/interfaces';
import { useQuery } from '@tanstack/vue-query';

interface GetUsers {
  users: User[];
}

const getUsers = async (): Promise<User[]> => {
  const { data } = await api.post<GqlResponse<GetUsers>>('/graphql', {
    query: getUsersQuery,
  });
  return data.data.users;
};

const useUsers = () => {
  const store = useUserStore();
  const { users, user, getUserByRole, UserDialog } = storeToRefs(store);

  const usersQuery = useQuery(
    ['users'],
    async () => {
      const users = await getUsers();
      store.setUsers(users);
      return users;
    },
    { staleTime: 1000 }
  );

  return {
    //* Props
    users,
    user,
    UserDialog,
    //! Getters
    getUserByRole,
    //? Methods
    usersQuery,
    store,
  };
};

export default useUsers;
