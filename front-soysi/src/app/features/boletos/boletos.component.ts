import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoletoService } from '../../core/services/boleto.service';

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.css',
})
export class BoletosComponent implements OnInit {
  destino = '';
  fechaViaje = '';
  observaciones = '';
  whatsappNumber = '5491112345678';
  loading = false;
  error = '';

  constructor(private boletoService: BoletoService) {}

  ngOnInit(): void {
    this.boletoService.getConfig().subscribe({
      next: (config) => {
        this.whatsappNumber = config.numeroWhatsApp;
      },
      error: () => {}
    });
  }

  solicitarBoleto(): void {
    if (!this.destino || !this.fechaViaje) {
      this.error = 'Completá destino y fecha del viaje';
      return;
    }

    const mensaje = this.generarMensaje();
    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  private generarMensaje(): string {
    let msg = `Hola, soy residente de la Fundación SI. Quiero solicitar un boleto de viaje:\n\n`;
    msg += `*Destino:* ${this.destino}\n`;
    msg += `*Fecha de viaje:* ${this.fechaViaje}\n`;
    if (this.observaciones) {
      msg += `*Observaciones:* ${this.observaciones}\n`;
    }
    msg += `\nGracias.`;
    return msg;
  }
}
