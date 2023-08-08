export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserDTO extends Omit<User, 'id'> {}
