import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SolicitudBoleto {
  residenteNombre: string;
  rol: 'RESIDENTE' | 'RESIDENTE_STOCK';
  tipoBoleto: 'COLECTIVO' | 'AVION';
  ciudadOrigen: string;
  ciudadDestino: string;
  fechaViaje: string;
  motivo?: string;
}

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletos.html',
  styleUrl: './boletos.css'
})
export class Boletos implements OnInit {
  solicitud: SolicitudBoleto = {
    residenteNombre: '',
    rol: 'RESIDENTE',
    tipoBoleto: 'COLECTIVO',
    ciudadOrigen: '',
    ciudadDestino: '',
    fechaViaje: '',
    motivo: ''
  };

  fechaMinima: string = '';
  errorFecha: string = '';
  enviado: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.calcularFechaMinima();
  }

  calcularFechaMinima(): void {
    const hoy = new Date();
    // Sumamos 7 días de anticipación mínima según regla de negocio
    hoy.setDate(hoy.getDate() + 7);
    this.fechaMinima = hoy.toISOString().split('T')[0];
  }

  enviarSolicitud(): void {
    if (new Date(this.solicitud.fechaViaje) < new Date(this.fechaMinima)) {
      this.errorFecha = 'El viaje debe solicitarse con al menos 7 días de anticipación.';
      return;
    }

    this.loading = true;
    this.errorFecha = '';

    // Simulación de envío al backend (Panel Admin / Notificación)
    setTimeout(() => {
      console.log('Solicitud enviada:', this.solicitud);
      this.enviado = true;
      this.loading = false;
      this.resetForm();
    }, 1500);
  }

  resetForm() {
    this.solicitud = { ...this.solicitud, ciudadOrigen: '', ciudadDestino: '', fechaViaje: '', motivo: '' };
  }
}