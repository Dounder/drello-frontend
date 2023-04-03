<script setup lang="ts">
import { AddNewComponent } from 'src/shared/components';
import { useHome } from 'src/shared/composables';
import { ref, watchEffect } from 'vue';
import { ClientCard, ClientDialog } from '../components';
import { useClient } from '../composables';
import { Client } from '../interfaces/client.interface';

const { clientsQuery, clients, store: clientStore } = useClient();

useHome().store.setWindowTitle('Clients | Drello'); // Set window title
useHome().store.setPageTitle('Clients'); // Set page title

const isOpen = ref<boolean>(false); // Dialog open state
const action = ref<'create' | 'update'>('create'); // Dialog action
const isVisible = ref(false);
const grid = ref<HTMLElement | null>(null);

// Open dialog to create new client
const onNew = () => {
  isOpen.value = true;
  action.value = 'create';
  clientStore.setClient(null);
};

// Open dialog to update client
const onUpdate = (client: Client) => {
  isOpen.value = true;
  action.value = 'update';
  clientStore.setClient({ ...client });
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
  <q-page padding class="client">
    <section class="grid" v-if="!clientsQuery.isLoading.value">
      <AddNewComponent @on:click="onNew" title="Add new client" />
      <ClientCard
        :client="client"
        v-for="client in clients"
        :key="client.id"
        @on:update="onUpdate"
        @on:delete="clientsQuery.refetch()"
      />
    </section>

    <q-inner-loading :showing="clientsQuery.isLoading.value" dark>
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>

    <ClientDialog :action="action" :is-open="isOpen" @on:close="isOpen = false" />
    <FabComponent v-if="isVisible" title="Add new user" @on:click="onNew" />
  </q-page>
</template>

<style lang="scss" scoped>
.client {
  background: darken($primary, 8);
  &-title {
    margin: 0;
  }
}
</style>
