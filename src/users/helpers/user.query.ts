export const getUsersQuery = `query ($limit: Int) {
  users(limit: $limit) {
    username
    roles
    id
    createdAt
    email
  }
}`;

export const addUserMutation = `mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    username
    roles
    id
    createdAt
    email
  }
}`;

export const updateUserMutation = `mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    username
    roles
    id
    createdAt
    email
  }
}`;

export const deleteUserMutation = `mutation RemoveUser($removeUserId: ID!) {
  removeUser(id: $removeUserId) {
    username
    roles
    id
    createdAt
    email
  }
}`;
