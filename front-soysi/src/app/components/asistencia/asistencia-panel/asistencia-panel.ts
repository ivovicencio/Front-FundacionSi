import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RegistroAsistencia {
  residenteNombre: string;
  fechaSalida: string;
  fechaRegresoEstimada: string;
  motivo?: string;
}

@Component({
  selector: 'app-asistencia-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia-panel.html',
  styleUrl: './asistencia-panel.css'
})
export class AsistenciaPanel implements OnInit {
  registros: RegistroAsistencia[] = [];
  filtroNombre: string = '';
  filtroFecha: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.loading = true;
    // Mock de datos 
    // En producción: this.asistenciaService.getAll().subscribe(...)
    this.registros = [
      { residenteNombre: 'Ivo Vicencio', fechaSalida: '2026-05-10T20:00', fechaRegresoEstimada: '2026-05-12T10:00', motivo: 'Viaje familiar' },
      { residenteNombre: 'Julian Rossi', fechaSalida: '2026-05-11T18:00', fechaRegresoEstimada: '2026-05-11T23:30', motivo: 'Cena' }
    ];
    this.loading = false;
  }

  get registrosFiltrados() {
    return this.registros.filter(r => {
      const coincideNombre = r.residenteNombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const coincideFecha = !this.filtroFecha || r.fechaSalida.startsWith(this.filtroFecha);
      return coincideNombre && coincideFecha;
    });
  }
}