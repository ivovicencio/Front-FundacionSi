import { RolUsuario } from './auth.models';

export interface User {
  id: number;
  nombre: string;
  email: string;
  dni: string;
  rol: RolUsuario;
  activo: boolean;
}

export interface CreateUserRequest {
  nombre: string;
  email: string;
  dni: string;
  rol: RolUsuario;
}

export interface UpdateUserRequest {
  nombre: string;
  email: string;
  rol: RolUsuario;
}
