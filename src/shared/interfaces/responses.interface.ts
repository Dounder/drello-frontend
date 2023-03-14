export interface ResponseError {
  statusCode: number;
  message: string;
  error: string;
}

export interface GqlResponse<T> {
  errors: Error[];
  data: T;
}

export interface Error {
  message: string;
  locations: Location[];
  path: string[];
  extensions: Extensions;
}

export interface Extensions {
  code: string;
  exception: Exception;
}

export interface Exception {
  query: string;
  parameters: string[];
  driverError: DriverError;
  length: number;
  severity: string;
  code: string;
  detail: string;
  schema: string;
  table: string;
  constraint: string;
  file: string;
  line: string;
  routine: string;
  stacktrace: string[];
}

export interface DriverError {
  length: number;
  name: string;
  severity: string;
  code: string;
  detail: string;
  schema: string;
  table: string;
  constraint: string;
  file: string;
  line: string;
  routine: string;
}

export interface Location {
  line: number;
  column: number;
}
