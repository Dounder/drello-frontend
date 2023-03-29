import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Client, ClientsList } from './../clients/interfaces/client.interface';

export const useClientStore = defineStore('client', () => {
  const clients = ref<ClientsList>({});
  const client = ref<Client | null>(null);

  return {
    //? Props
    client,
    clients,

    //* Getters
    getClients: computed(() => client),

    //! Actions
    setClients: (data: Client[]) => {
      // Save client data in the store
      clients.value = data.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
    },
    setClient: (data: Client | null) => {
      // Save client data in the store
      client.value = data;
    },
    addClient: (data: Client) => {
      // Save client data in the store
      clients.value = { ...clients.value, [data.id]: data };
    },
    updateClient: (data: Client) => {
      // Update client data in the store
      clients.value = { ...clients.value, [data.id]: data };
    },
    deleteClient: (id: string) => {
      // Delete client data in the store
      clients.value = Object.keys(clients.value)
        .filter((key) => key !== id)
        .reduce((prev, curr) => ({ ...prev, [curr]: clients.value[curr] }), {});
    },
  };
});
