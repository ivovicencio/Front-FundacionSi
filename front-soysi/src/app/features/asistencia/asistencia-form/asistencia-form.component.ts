import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../../core/services/asistencia.service';

@Component({
  selector: 'app-asistencia-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia-form.component.html',
  styleUrl: './asistencia-form.component.css',
})
export class AsistenciaFormComponent {
  fecha = new Date().toISOString().split('T')[0];
  presente = true;
  loading = false;
  success = false;
  error = '';

  constructor(private asistenciaService: AsistenciaService) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = false;

    this.asistenciaService.registrar(this.fecha, this.presente).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al registrar asistencia';
        this.loading = false;
      }
    });
  }
}
