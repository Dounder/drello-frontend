import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from 'src/boot/api';
import { useDialog } from 'src/shared/composables';
import { Client } from '../interfaces/client.interface';
import { GqlResponse } from './../../shared/interfaces/responses.interface';
import { addClientMutation } from './../helpers/client-queries.helper';
import { AddClient } from './../interfaces/client.interface';

const createClient = async (clientData: AddClient): Promise<Client> => {
  const { data } = await api.post<GqlResponse<Client>>('/graphql', {
    query: addClientMutation,
    variables: { createClientInput: clientData },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as Client;
};

const useClientMutation = () => {
  const queryClient = useQueryClient();
  const { onError } = useDialog();

  const clientMutation = useMutation(createClient, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
      queryClient.refetchQueries(['clients'], { exact: false });
      queryClient.setQueryData(['clients', res.id], res);
    },
    onError: (error: Error) => {
      if (error.message.includes('client_email_IX')) return onError('Error!', 'Email has already used by other client');

      onError('Unexpected Error!', 'Talk to an administrator');
    },
  });

  return {
    clientMutation,
  };
};

export default useClientMutation;
