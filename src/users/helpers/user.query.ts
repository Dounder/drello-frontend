export const getUsersQuery = `{
  users {
    username
    roles
    id
    createdAt
    email
    lastUpdatedBy {
      username
    }
  }
}`;
