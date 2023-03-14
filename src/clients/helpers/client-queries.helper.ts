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
