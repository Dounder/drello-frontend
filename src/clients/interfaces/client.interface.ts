export interface ClientsList {
  [x: string]: Client;
}

export interface Client {
  id: string;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date;
  name: string;
  email: string;
  nit?: string | null;
  // createdBy: User!;
  // projects: [Project!]!;
}
