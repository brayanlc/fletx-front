export interface User {
  id: number;
  email: string;
  nombre: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
