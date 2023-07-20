export interface ApiError {
  message: string;
  error: string;
}

export interface ApiCollection<T> {
  data: {
    items: T[];
  };
  errors: ApiError[];
}

export interface ApiItem<T> {
  data: {
    item: T;
  };
}
