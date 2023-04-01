import { ResponseError } from 'src/shared/interfaces';
import { User } from 'src/users/interfaces';

export interface AuthData {
  user: User | null;
  token: string | null;
  error: ResponseError | null;
}

export interface AuthError {
  errors: Error[];
  data: null;
}

export interface Error {
  message: string;
  extensions: Extensions;
}

export interface Extensions {
  code: string;
  response: Response;
}

export interface Response {
  statusCode: number;
  message: string;
}
