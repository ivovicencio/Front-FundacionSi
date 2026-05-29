export interface LoginRequest {
  email: string;
  dni: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  rol: RolUsuario;
  nombre: string;
  passwordCambiada: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface JwtPayload {
  userId: number;
  rol: RolUsuario;
  email: string;
  scope: string;
  exp: number;
  iat: number;
}

export type RolUsuario = 'ADMIN' | 'RESIDENTE_STOCK' | 'RESIDENTE';
