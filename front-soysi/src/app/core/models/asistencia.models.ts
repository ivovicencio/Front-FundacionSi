export interface Asistencia {
  id?: number;
  usuarioId?: number;
  usuarioNombre?: string;
  fecha: string;
  presente: boolean;
}

export interface AsistenciaFilter {
  usuario?: string;
  fecha?: string;
  page?: number;
  size?: number;
}
