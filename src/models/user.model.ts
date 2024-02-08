export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserWhithoutPassword {
  name: string;
  email: string;
};

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}