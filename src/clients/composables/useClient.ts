import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot/api';
import { GqlResponse } from 'src/shared/interfaces';
import { toRefs } from 'vue';
import { Client } from '../interfaces/client.interface';
import { useClientStore } from './../../stores/client.store';
import { getClientsQuery } from './../helpers/client-queries.helper';

interface GetClients {
  clients: Client[];
}

const getClients = async (): Promise<Client[]> => {
  const { data } = await api.post<GqlResponse<GetClients>>('/graphql', { query: getClientsQuery });
  return data.data.clients;
};

const useClient = () => {
  const store = useClientStore();
  const { client, clients } = toRefs(store);

  const clientsQuery = useQuery(
    ['clients'],
    async () => {
      const clients = await getClients();
      store.setClients(clients);
      return clients;
    },
    { staleTime: 10000 }
  );

  return {
    client,
    clients,

    store,
    clientsQuery,
  };
};

export default useClient;
