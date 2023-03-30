import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from 'src/boot/api';
import { useDialog } from 'src/shared/composables';
import { Client } from '../interfaces/client.interface';
import { GqlResponse } from './../../shared/interfaces/responses.interface';
import { useClientStore } from './../../stores/client.store';
import { addClientMutation, deleteClientMutation, updateClientMutation } from './../helpers/client-queries.helper';
import { AddClient, UpdateClient } from './../interfaces/client.interface';

const createClient = async (clientData: AddClient): Promise<Client> => {
  const { data } = await api.post<GqlResponse<Client>>('/graphql', {
    query: addClientMutation,
    variables: { createClientInput: clientData },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as Client;
};

const updateClient = async (clientData: UpdateClient): Promise<Client> => {
  const { data } = await api.post<GqlResponse<Client>>('/graphql', {
    query: updateClientMutation,
    variables: { updateClientInput: clientData },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as Client;
};

const deleteClient = async (id: string): Promise<Client> => {
  const { data } = await api.post<GqlResponse<Client>>('/graphql', {
    query: deleteClientMutation,
    variables: { removeClientId: id },
  });

  if (!data.data) throw new Error(data.errors[0].message);

  return data.data as Client;
};

const useClientMutation = () => {
  const queryClient = useQueryClient();
  const store = useClientStore();
  const { onError } = useDialog();

  const createClientMutation = useMutation(createClient, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
      queryClient.refetchQueries(['clients'], { exact: false });
      queryClient.setQueryData(['clients', res.id], res);
      store.addClient(res);
    },
    onError: (error: Error) => {
      const match = error.message.match(/\((.*?)\)/g);
      const message = match ? `${match[0]} = ${match[1]} has already used by other client` : error.message;

      onError('Error!', message);
    },
  });

  const updateClientMutation = useMutation(updateClient, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
      queryClient.refetchQueries(['clients'], { exact: false });
      queryClient.setQueryData(['clients', res.id], res);
      store.updateClient(res);
    },
    onError: (error: Error) => {
      const match = error.message.match(/\((.*?)\)/g);
      const message = match ? `${match[0]} = ${match[1]} has already used by other client` : error.message;

      onError('Error!', message);
    },
  });

  const deleteClientMutation = useMutation(deleteClient, {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: false });
      queryClient.refetchQueries(['clients'], { exact: false });
      queryClient.removeQueries(['clients', res.id]);
      store.deleteClient(res.id);
    },
    onError: (error: Error) => onError('Error!', error.message),
  });

  return {
    //! Client Store
    store,

    //? Mutations
    createClientMutation,
    updateClientMutation,
    deleteClientMutation,
  };
};

export default useClientMutation;
