export interface BoletoConfig {
  numeroWhatsApp: string;
}

export interface SolicitudBoleto {
  destino: string;
  fechaViaje: string;
  observaciones?: string;
}
