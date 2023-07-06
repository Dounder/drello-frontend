import { ApiError } from './../interfaces/api-response.interface';

export const ApiException = (args: ApiError): ApiError => ({ ...args });
