import { useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { api } from 'src/boot/api';
import { Client } from '../interfaces/client.interface';
import { addClientMutation } from './../helpers/client-queries.helper';
import { AddClient, GqlResponse } from './../interfaces/client.interface';

const createClient = async (clientData: AddClient): Promise<Client> => {
  const { data } = await api.post<GqlResponse>('/graphql', {
    query: addClientMutation,
    variables: { createClientInput: clientData },
  });
  return data.data as Client;
};

const useClientMutation = () => {
  const queryClient = useQueryClient();

  const clientMutation = useMutation(createClient, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
      queryClient.refetchQueries(['clients'], { exact: false });
      queryClient.setQueryData(['clients', res.id], res);
    },
    onError: (error) => {
      axios.isAxiosError(error) ? console.log(error.response) : console.log(error);
    },
  });

  return {
    clientMutation,
  };
};

export default useClientMutation;
