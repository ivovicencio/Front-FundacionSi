import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DiaEncuesta {
  fecha: string;
  almuerzo: boolean;
  cena: boolean;
}

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css'
})
export class Encuesta implements OnInit {
  nombreResidente: string = '';
  modo: 'DIA' | 'SEMANA' = 'DIA';
  diasVisibles: DiaEncuesta[] = [];
  enviado: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.actualizarDias();
  }

  actualizarDias(): void {
    // En una app real, esto consultaría el MenuDia del backend v1.1[cite: 3]
    const hoy = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric' });
    
    if (this.modo === 'DIA') {
      this.diasVisibles = [{ fecha: hoy, almuerzo: false, cena: false }];
    } else {
      // Mock de la semana completa
      this.diasVisibles = [
        { fecha: 'Lunes', almuerzo: false, cena: false },
        { fecha: 'Martes', almuerzo: false, cena: false },
        { fecha: 'Miércoles', almuerzo: false, cena: false },
        { fecha: 'Jueves', almuerzo: false, cena: false },
        { fecha: 'Viernes', almuerzo: false, cena: false }
      ];
    }
  }

  get totalComidasSeleccionadas(): number {
    return this.diasVisibles.reduce((acc, d) => acc + (d.almuerzo ? 1 : 0) + (d.cena ? 1 : 0), 0);
  }

  enviarEncuesta(): void {
    this.loading = true;
    // Simulación de POST /asistencias (pendiente en backend v1.1)[cite: 3, 5]
    setTimeout(() => {
      console.log('Encuesta enviada:', { residente: this.nombreResidente, dias: this.diasVisibles });
      this.enviado = true;
      this.loading = false;
    }, 1200);
  }
}