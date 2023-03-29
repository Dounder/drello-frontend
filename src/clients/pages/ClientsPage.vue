<script setup lang="ts">
import { AddNewComponent } from 'src/shared/components';
import { useHome, useNotify } from 'src/shared/composables';
import { ref, watch } from 'vue';
import { ClientCard, ClientDialog } from '../components';
import { useClient, useClientMutation } from '../composables';
import { Client } from '../interfaces/client.interface';

const { clientsQuery, clients, store: clientStore } = useClient();
const { deleteClientMutation } = useClientMutation();
const { notify } = useNotify();

useHome().store.setWindowTitle('Clients | Drello'); // Set window title
useHome().store.setPageTitle('Clients'); // Set page title

const isOpen = ref<boolean>(false); // Dialog open state
const action = ref<'create' | 'update'>('create'); // Dialog action

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

// Delete client
const onDelete = (id: string) => {
  notify({ message: 'Client deleted', type: 'positive' }); // Notify success

  clientStore.setClient(null);
  clientStore.deleteClient(id);
  deleteClientMutation.mutate(id);
};

watch(
  () => deleteClientMutation.isSuccess.value, // Watch delete mutation
  (isSuccess: boolean) => {
    if (isSuccess) {
      clientsQuery.refetch(); // Refetch clients
      deleteClientMutation.reset(); // Reset mutation
    }
  }
);
</script>

<template>
  <q-page padding class="client">
    <section class="client-container" v-if="!clientsQuery.isLoading.value">
      <AddNewComponent @on:click="onNew" />
      <ClientCard
        :is-loading="deleteClientMutation.isLoading.value"
        :client="client"
        v-for="client in clients"
        :key="client.id"
        @on:update="onUpdate"
        @on:delete="onDelete"
      />
    </section>

    <q-inner-loading :showing="clientsQuery.isLoading.value" dark>
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>

    <ClientDialog :action="action" :is-open="isOpen" @on:close="isOpen = false" />
  </q-page>
</template>

<style lang="scss" scoped>
.client {
  background: darken($primary, 8);
  &-title {
    margin: 0;
  }
  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-rows: auto;
    gap: 1rem;
    grid-auto-flow: dense;
    position: relative;
  }
}
</style>
