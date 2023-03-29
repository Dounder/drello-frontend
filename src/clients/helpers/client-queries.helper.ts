export const getClientsQuery = `{
  clients {
    id
    email
    name
    nit
    createdAt
  }
}`;

export const addClientMutation = `mutation CreateClient($createClientInput: CreateClientInput!) {
  createClient(createClientInput: $createClientInput) {
    id
    name
    nit
    email
    createdAt
  }
}`;

export const updateClientMutation = `mutation UpdateClient($updateClientInput: UpdateClientInput!) {
  updateClient(updateClientInput: $updateClientInput) {
    id
    name
    nit
    email
    createdAt
  }
}`;

export const deleteClientMutation = `mutation RemoveClient($removeClientId: ID!) {
  removeClient(id: $removeClientId) {
    id
    name
    nit
    email
    createdAt
  }
}`;
