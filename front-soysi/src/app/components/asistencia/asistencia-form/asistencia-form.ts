import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definimos una interfaz clara para el modelo de datos según la entidad sugerida
interface AsistenciaRegistro {
  residenteNombre: string;
  fechaSalida: string;
  fechaRegresoEstimada: string;
  motivo?: string;
}

@Component({
  selector: 'app-asistencia-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia-form.html',
  styleUrl: './asistencia-form.css'
})
export class AsistenciaForm {
  // Inicializamos con el modelo vacío
  asistencia: AsistenciaRegistro = {
    residenteNombre: '',
    fechaSalida: '',
    fechaRegresoEstimada: '',
    motivo: ''
  };

  loading = false;
  statusMessage = { text: '', type: '' }; // Para manejar errores y éxitos profesionalmente

  registrarAsistencia(): void {
    if (!this.validarFechas()) return;

    this.loading = true;
    this.statusMessage = { text: '', type: '' };

    // Simulación de POST /asistencias según docu v1.1
    // El usuario se obtendría idealmente del JWT (authService), 
    // pero mantenemos el campo nombre por ahora.
    setTimeout(() => {
      console.log('Enviando a Backend:', this.asistencia);
      this.loading = false;
      this.statusMessage = { text: 'Asistencia registrada con éxito.', type: 'success' };
      this.resetForm();
    }, 1500);
  }

  private validarFechas(): boolean {
    const salida = new Date(this.asistencia.fechaSalida);
    const regreso = new Date(this.asistencia.fechaRegresoEstimada);
    const ahora = new Date();

    if (salida < ahora) {
      this.statusMessage = { text: 'La fecha de salida no puede ser en el pasado.', type: 'error' };
      return false;
    }

    if (regreso <= salida) {
      this.statusMessage = { text: 'El regreso debe ser posterior a la salida.', type: 'error' };
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.asistencia = { residenteNombre: '', fechaSalida: '', fechaRegresoEstimada: '', motivo: '' };
  }
}