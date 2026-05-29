import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../../core/services/asistencia.service';
import { Asistencia } from '../../../core/models/asistencia.models';

@Component({
  selector: 'app-asistencia-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia-panel.component.html',
  styleUrl: './asistencia-panel.component.css',
})
export class AsistenciaPanelComponent implements OnInit {
  registros: Asistencia[] = [];
  filtroUsuario = '';
  filtroFecha = '';
  loading = true;

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.loading = true;
    this.asistenciaService.getAll({
      usuario: this.filtroUsuario || undefined,
      fecha: this.filtroFecha || undefined
    }).subscribe({
      next: (data) => {
        this.registros = data;
        this.loading = false;
      },
      error: () => {
        this.registros = [];
        this.loading = false;
      }
    });
  }

  get registrosFiltrados(): Asistencia[] {
    return this.registros.filter(r => {
      const coincideNombre = !this.filtroUsuario ||
        (r.usuarioNombre || '').toLowerCase().includes(this.filtroUsuario.toLowerCase());
      const coincideFecha = !this.filtroFecha ||
        r.fecha.startsWith(this.filtroFecha);
      return coincideNombre && coincideFecha;
    });
  }
}
