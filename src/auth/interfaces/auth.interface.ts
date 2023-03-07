import { ResponseError } from 'src/shared/interfaces';

export interface AuthData {
  user: User | null;
  token: string | null;
  error: ResponseError | null;
}

export interface User {
  id: string;
  createdAt: string;
  updateAt: string;
  deletedAt: null;
  username: string;
  email: string;
  password: string;
  roles: string[];
}
