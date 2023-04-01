<script setup lang="ts">
import { AddNewComponent, FabComponent } from 'src/shared/components';
import { useHome } from 'src/shared/composables';
import { ref, watchEffect } from 'vue';
import { UserCard, UserDialog } from '../components';
import useUsers from '../composables/useUsers';
import { User } from '../interfaces';

useHome().store.setWindowTitle('Users | Drello');
useHome().store.setPageTitle('Users');

const { usersQuery, users, store } = useUsers();
const action = ref<'create' | 'update'>('create'); // Dialog action
const grid = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const onNew = () => {
  action.value = 'create';
  store.setUser(null);
  store.setUserDialog(true);
};

const onUpdate = (user: User) => {
  action.value = 'update';
  store.setUser(user);
  store.setUserDialog(true);
};

watchEffect(() => {
  if (grid.value)
    grid.value.addEventListener('scroll', () => {
      const { scrollTop } = grid.value as HTMLElement;
      isVisible.value = scrollTop > 150;
    });
});
</script>

<template>
  <q-page padding>
    <section ref="grid" class="grid" v-if="!usersQuery.isLoading.value">
      <AddNewComponent @on:click="onNew" title="Add new user" />
      <UserCard @on:update="onUpdate" :is-loading="false" :user="user" v-for="user in users" :key="user.id" />
    </section>

    <q-inner-loading :showing="usersQuery.isLoading.value" dark>
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>

    <UserDialog :action="action"> </UserDialog>
    <FabComponent v-if="isVisible" title="Add new user" @on:click="onNew" />
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  background: darken($primary, 8);
}
</style>
