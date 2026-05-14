import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Preparado para API

interface Residente {
  id: number;
  nombre: string;
  rol: 'ADMIN' | 'RESIDENTE_STOCK' | 'RESIDENTE'; // Alineado con backend v1.1
}

@Component({
  selector: 'app-asignar-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './asignar-stock.html',
  styleUrl: './asignar-stock.css'
})
export class AsignarStock implements OnInit {
  residentesDisponibles: Residente[] = [];
  grupoSeleccionado: Residente[] = [];
  grupoActualActivo: boolean = false;
  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    // Aquí irían las llamadas reales:
    // this.userService.getResidentes().subscribe(...)
    // this.stockGroupService.getActive().subscribe(...)
    
    // Mock temporal alineado a la documentación
    this.residentesDisponibles = [
      { id: 1, nombre: 'Juan Pérez', rol: 'RESIDENTE' },
      { id: 2, nombre: 'Marta Gómez', rol: 'RESIDENTE' },
      { id: 3, nombre: 'Pedro Armella', rol: 'RESIDENTE' },
      { id: 4, nombre: 'Lucía Sosa', rol: 'RESIDENTE' },
      { id: 5, nombre: 'Franco Martínez', rol: 'RESIDENTE' }
    ];
    this.loading = false;
  }

  toggleSeleccion(resi: Residente): void {
    const isSelected = this.grupoSeleccionado.some(r => r.id === resi.id);
    
    if (isSelected) {
      this.grupoSeleccionado = this.grupoSeleccionado.filter(r => r.id !== resi.id);
    } else {
      if (this.grupoSeleccionado.length < 3) {
        this.grupoSeleccionado = [...this.grupoSeleccionado, resi];
      }
    }
  }

  confirmarGrupo(): void {
    if (this.grupoSeleccionado.length !== 3) return;

    this.loading = true;
    // Simulación de POST /stock-group
    setTimeout(() => {
      console.log('Enviando a Backend:', this.grupoSeleccionado);
      this.grupoActualActivo = true;
      this.grupoSeleccionado = [];
      this.loading = false;
      // Aquí dispararías un Toast o notificación profesional
    }, 1000);
  }

  eliminarGrupoActual(): void {
    // Aquí llamarías a DELETE o PUT /stock-group/finalizar
    this.grupoActualActivo = false;
  }
}