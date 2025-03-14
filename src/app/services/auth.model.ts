export interface AuthResponse {
    token: string; 
    user: {
      id: number;
      username: string;
      is_admin: boolean;
    };
  }