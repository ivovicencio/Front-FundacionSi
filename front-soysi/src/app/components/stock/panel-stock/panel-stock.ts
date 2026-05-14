import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './panel-stock.html',
  styleUrl: './panel-stock.css',
})
export class PanelStock implements OnInit {
  // Datos simulados alineados a la docu v1.1[cite: 4, 5]
  conteoMensual: any[] = [];
  conteoSemanal: any[] = [];
  conteoOcasa: any[] = [];
  pedidoGenerado: any[] = [];
  
  personasEnPeriodo = 30;
  reglasEditable: Array<{ key: string; porPersona30dias: number; unidad: string }> = [];

  ngOnInit(): void {
    this.cargarDatosMock();
  }

  cargarDatosMock() {
    // Esto después se reemplaza por los servicios de la v1.1[cite: 5]
    this.conteoMensual = [ { nombre: 'Arroz', total: 10 } ];
    this.conteoSemanal = [ { nombre: 'Tomate', actual: 2 } ];
    this.conteoOcasa = [ { codigo: 'GI-123' } ];
    
    this.reglasEditable = [
      { key: 'arroz', porPersona30dias: 1, unidad: 'kg' },
      { key: 'aceite', porPersona30dias: 0.5, unidad: 'L' }
    ];
  }

  generarPedidoMensual() {
    // Lógica para calcular según reglas[cite: 26]
    this.pedidoGenerado = [
      { nombre: 'Arroz', cantidad: 20 },
      { nombre: 'Fideos', cantidad: 15 }
    ];
  }

  confirmarPedido() {
    console.log('Pedido confirmado:', this.pedidoGenerado);
    alert('Pedido enviado al sistema central.');
  }

  agregarRegla() {
    this.reglasEditable.push({ key: '', porPersona30dias: 0, unidad: '' });
  }

  eliminarRegla(index: number) {
    this.reglasEditable.splice(index, 1);
  }

  guardarReglas() {
    console.log('Reglas actualizadas:', this.reglasEditable);
    alert('Reglas guardadas correctamente.');
  }
}