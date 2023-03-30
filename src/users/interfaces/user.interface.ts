export interface UsersList {
  [x: string]: User;
}

export interface User {
  createdAt: Date;
  deletedAt: Date | null;
  email: string;
  id: string;
  roles: UserRoles[];
  updateAt: Date;
  username: string;
  lastUpdatedBy: User | null;
}

export interface AddUser {
  email: string;
  password: string;
  roles?: UserRoles[] | null;
  username: string;
}

export interface UpdateUser {
  createdAt: Date;
  email: string;
  id: string;
  password: string;
  roles?: UserRoles[] | null;
  username: string;
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}
