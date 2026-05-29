export interface MenuDia {
  id?: number;
  fecha: string;
  almuerzo: boolean;
  conCarne: boolean;
}

export interface Menu {
  id?: number;
  fechaInicio: string;
  fechaFin: string;
  diasMenu: MenuDia[];
}

export interface CreateMenuRequest {
  fechaInicio: string;
  fechaFin: string;
  diasMenu: {
    fecha: string;
    almuerzo: boolean;
    conCarne: boolean;
  }[];
}
