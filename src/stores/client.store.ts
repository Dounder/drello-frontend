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
      clients.value = data.map((client) => ({ [client.id]: client }))[0];
    },
  };
});
