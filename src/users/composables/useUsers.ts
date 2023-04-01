import { getUsersQuery } from './../helpers/user.query';
import { api } from 'src/boot/api';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user.store';
import { GqlResponse } from 'src/shared/interfaces';
import { useQuery } from '@tanstack/vue-query';
import { User } from '../interfaces';

interface GetUsers {
  users: User[];
}

const getUsers = async (): Promise<User[]> => {
  const { data } = await api.post<GqlResponse<GetUsers>>('/graphql', {
    query: getUsersQuery,
    variables: { limit: 100 },
  });
  return data.data.users;
};

const useUsers = () => {
  const store = useUserStore();
  const { getUsers: users, user, getUserByRole, userDialog } = storeToRefs(store);

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
    user,
    userDialog,
    //! Getters
    users,
    getUserByRole,
    //? Methods
    usersQuery,
    store,
  };
};

export default useUsers;
