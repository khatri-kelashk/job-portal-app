export interface User {
  id: string;
  email: string;
  name: string;
  phone_no: string;
  is_active: boolean;
  role: string;
  date_joined: Date;
  last_login: Date;
}
export interface UserData {
    user: User
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: UserData;
  token: string;
  refreshToken?: string;
  message: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}