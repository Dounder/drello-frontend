import { defineStore } from 'pinia';
import { UsersList } from 'src/users/interfaces';
import { computed, ref } from 'vue';
import { User, UserRoles } from './../users/interfaces/user.interface';

export const useUserStore = defineStore('users', () => {
  const users = ref<UsersList>({});
  const user = ref<User | null>(null);
  const userDialog = ref<boolean>(false);

  return {
    //? Props
    users,
    user,
    userDialog,

    //* Getters
    getUserByRole: computed(
      () => (role: UserRoles) => Object.values(users.value).filter((user) => user.roles.includes(role))
    ),
    getUsers: computed(() => users.value),
    isDialogOpen: computed(() => userDialog.value),

    //! Actions
    setUsers: (data: User[]) => {
      // Save user data in the store
      users.value = data.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
    },
    setUser: (data: User | null) => {
      // Save user data in the store
      user.value = data;
    },
    addUser: (data: User) => {
      // Save user data in the store
      users.value = { [data.id]: data, ...users.value };
    },
    updateUser: (data: User) => {
      // Update user data in the store
      users.value = { [data.id]: data, ...users.value };
    },
    deleteUser: (id: string) => {
      // Delete user data in the store
      users.value = Object.keys(users.value)
        .filter((key) => key !== id)
        .reduce((prev, curr) => ({ ...prev, [curr]: users.value[curr] }), {});
    },
    setUserDialog: (data: boolean) => {
      userDialog.value = data;
    },
  };
});
