export interface User {
  name: string;
  email: string;
  password: string;
}

export type UserWhithoutPassword = Omit<User, 'password'>;

export interface Login {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  user: User;
  token: string;
}