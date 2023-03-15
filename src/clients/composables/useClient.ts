import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot/api';
import { GqlResponse } from 'src/shared/interfaces';
import { Client } from '../interfaces/client.interface';
import { getClientsQuery } from './../helpers/client-queries.helper';

const getClients = async (): Promise<Client[]> => {
  const { data } = await api.post<GqlResponse<Client[]>>('/graphql', { query: getClientsQuery });
  return data.data as Client[];
};

const useClient = () => {
  const clientsQuery = useQuery(['clients'], () => getClients(), { staleTime: 1000 });

  return {
    clientsQuery,
  };
};

export default useClient;
