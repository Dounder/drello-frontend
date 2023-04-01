import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/api';
import { useDialog } from 'src/shared/composables';
import { GqlResponse } from 'src/shared/interfaces';
import { useUserStore } from 'src/stores/user.store';
import { AddUser, UpdateUser, User } from '../interfaces';
import { addUserMutation, deleteUserMutation, updateUserMutation } from './../helpers/user.query';

const createUser = async (userData: AddUser): Promise<User> => {
  const { data } = await api.post<GqlResponse<User>>('/graphql', {
    query: addUserMutation,
    variables: { createUserInput: userData },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as User;
};

const updateUser = async (userData: UpdateUser): Promise<User> => {
  const { username, email, id, roles } = userData;
  const { data } = await api.post<GqlResponse<User>>('/graphql', {
    query: updateUserMutation,
    variables: { updateUserInput: { username, email, id, roles } },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as User;
};

const deleteUser = async (id: string): Promise<User> => {
  const { data } = await api.post<GqlResponse<User>>('/graphql', {
    query: deleteUserMutation,
    variables: { removeUserId: id },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as User;
};

const useUserMutation = () => {
  const queryClient = useQueryClient();
  const store = useUserStore();
  const { isDialogOpen, getUserByRole } = storeToRefs(store);
  const { onError } = useDialog();

  const addUserMutation = useMutation(createUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });
      queryClient.refetchQueries(['users'], { exact: false });
      queryClient.setQueryData(['users', res.id], res);
      store.addUser(res);
    },
    onError: (error: Error) => {
      const match = error.message.match(/\((.*?)\)/g);
      const message = match ? `${match[0]} = ${match[1]} has already used by other user` : error.message;

      onError('Error', message);
    },
  });

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });
      queryClient.refetchQueries(['users'], { exact: false });
      queryClient.setQueryData(['users', res.id], res);
      store.updateUser(res);
    },
    onError: (error: Error) => {
      const match = error.message.match(/\((.*?)\)/g);
      const message = match ? `${match[0]} = ${match[1]} has already used by other user` : error.message;

      onError('Error', message);
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });
      queryClient.refetchQueries(['users'], { exact: false });
      queryClient.removeQueries(['users', res.id]);
      store.deleteUser(res.id);
    },
    onError: (error: Error) => {
      onError('Error', error.message);
    },
  });

  return {
    //* Props
    store,
    //! Getters
    getUserByRole,
    isDialogOpen,
    //? Methods
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};

export default useUserMutation;
