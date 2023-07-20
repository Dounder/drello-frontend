import { User } from 'src/auth/interfaces/auth.interface';

export interface Board {
  createdAt: string;
  createdBy: User;
  deletedAt: null;
  id: string;
  lists: unknown[];
  members: User[];
  title: string;
  updateAt: string;
}
