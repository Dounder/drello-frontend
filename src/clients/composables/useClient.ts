import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot/api';
import { Client } from '../interfaces/client.interface';
import { getClientsQuery } from './../helpers/client-queries.helper';

const getClients = async (): Promise<Client[]> => {
  const { data } = await api.post<{ data: Client[] }>('/graphql', { query: getClientsQuery });
  return data.data;
};

const useClient = () => {
  const clientsQuery = useQuery(['clients'], () => getClients(), { staleTime: 1000 });

  return {
    clientsQuery,
  };
};

export default useClient;