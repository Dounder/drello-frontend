export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  createdAt: string;
  updateAt: string;
  deletedAt: null;
  username: string;
  email: string;
  roles: UserRoles[];
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}
