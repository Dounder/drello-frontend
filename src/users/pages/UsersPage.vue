<script setup lang="ts">
import { AddNewComponent } from 'src/shared/components';
import { useHome } from 'src/shared/composables';
import { ref } from 'vue';
import { UserCard, UserDialog } from '../components';
import useUsers from '../composables/useUsers';

useHome().store.setWindowTitle('Users | Drello');
useHome().store.setPageTitle('Users');

const { usersQuery, users, store } = useUsers();
const action = ref<'create' | 'update'>('create'); // Dialog action

const onNew = () => {
  action.value = 'create';
  store.setUser(null);
  store.setUserDialog(true);
};
</script>

<template>
  <q-page padding class="user">
    <section class="grid" v-if="!usersQuery.isLoading.value">
      <AddNewComponent @on:click="onNew" title="Add new user" />
      <UserCard v-for="user in users" :key="user.id" />
    </section>

    <q-inner-loading :showing="usersQuery.isLoading.value" dark>
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>

    <UserDialog :action="action"> </UserDialog>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  background: darken($primary, 8);
}
</style>
