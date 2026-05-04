import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ItemOcasa {
  codigo: string;
  nombre: string;
  peso: number; // peso neto por paquete (g, kg, ml, l, o 1 si unidad)
  unidad: 'KG' | 'G' | 'L' | 'ML' | 'UNIDAD';
  paquetes: number;
  fardos: number;
  total: number; // calculado (Kg o unidades según unidad)
  vencimiento: string;
}

interface ResidenteBox {
  codigo: string;
  estudiante: string;
  cantidad: number; // bultos/cajas
  retiro: string; // texto libre o fecha
}

@Component({
  selector: 'app-conteo-ocasa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conteo-ocasa.html',
  styleUrls: ['./conteo-ocasa.css'],
})
export class ConteoOcasa implements OnInit {
  fechaRecepcion: string = '';
  itemsRecibidos: ItemOcasa[] = [
    { codigo: 'GI-3715', nombre: 'Olla Avon', peso: 1, unidad: 'UNIDAD', paquetes: 2, fardos: 1, total: 2, vencimiento: '' },
  ];

  cajasResidentes: ResidenteBox[] = [
    { codigo: 'G-3709', estudiante: 'Matias Bari', cantidad: 1, retiro: '' }
  ];

  ngOnInit(): void {
    const saved = localStorage.getItem('conteoOcasa');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { fechaRecepcion: string; itemsRecibidos: ItemOcasa[]; cajasResidentes: ResidenteBox[] };
        this.fechaRecepcion = parsed.fechaRecepcion || '';
        this.itemsRecibidos = parsed.itemsRecibidos || this.itemsRecibidos;
        this.cajasResidentes = parsed.cajasResidentes || this.cajasResidentes;
      } catch {
   
      }
    }
    // ensure totals correct
    this.itemsRecibidos.forEach(i => this.calcularTotal(i));
  }
  // Agrega una fila vacía a la lista de items recibidos para completar manualmente.
  agregarItem(): void {
    this.itemsRecibidos.push({ codigo: '', nombre: '', peso: 0, unidad: 'KG', paquetes: 0, fardos: 0, total: 0, vencimiento: '' });
  }
  // Elimina un item recibido por su índice.
  removeItem(index: number): void {
    this.itemsRecibidos.splice(index, 1);
  }
  // Agrega una fila para registrar una caja/bulto destinada a un residente.
  agregarCajaResidente(): void {
    this.cajasResidentes.push({ codigo: '', estudiante: '', cantidad: 0, retiro: '' });
  }
  // Elimina la fila de caja de residente por índice.
  removeCajaResidente(idx: number): void {
    this.cajasResidentes.splice(idx, 1);
  }
  // Calcula y actualiza el campo `total` del item según unidad, peso, paquetes y fardos.
  calcularTotal(item: ItemOcasa): void {
    // si no hay peso o paquetes, total es 0
    const p = item.peso || 0;
    const paquetes = item.paquetes || 0;
    const fardos = item.fardos || 0;

    let total = 0;
    switch (item.unidad) {
      case 'KG':
        total = p * paquetes * (fardos || 1);
        break;
      case 'G':
        total = (p / 1000) * paquetes * (fardos || 1);
        break;
      case 'L':
        total = p * paquetes * (fardos || 1);
        break;
      case 'ML':
        total = (p / 1000) * paquetes * (fardos || 1);
        break;
      case 'UNIDAD':
        total = paquetes * (fardos || 1);
        break;
      default:
        total = paquetes * (fardos || 1);
    }

    // formato: si es unidad, redondear a entero. Si es kg o lts, mostrar 2 decimales (o 3 si <1).
    if (item.unidad === 'UNIDAD') {
      item.total = Math.round(total);
    } else {
      if (total >= 1) item.total = Math.round(total * 100) / 100;
      else item.total = Math.round(total * 1000) / 1000;
    }
  }
  // Devuelve una etiqueta legible para la unidad (Kg, Lts, unidades).
  getDisplayUnit(u: ItemOcasa | { unidad: string }): string {
    const unit = (u as any).unidad as string;
    if (unit === 'KG' || unit === 'G') return 'Kg';
    if (unit === 'L' || unit === 'ML') return 'Lts';
    return 'unidades';
  }
  // Formatea el total calculado para mostrarlo en la tabla (con unidad cuando corresponda).
  formatTotal(item: ItemOcasa): string {
    if (!item.total) return '0';
    const unit = this.getDisplayUnit(item);
    return unit === 'unidades' ? `${item.total}` : `${item.total} ${unit}`;
  }
  // Guarda la recepción (fecha, items y cajas residentes) en localStorage y escribe en consola.
  confirmarRecepcion(): void {
    const payload = { fechaRecepcion: this.fechaRecepcion, itemsRecibidos: this.itemsRecibidos, cajasResidentes: this.cajasResidentes };
    localStorage.setItem('conteoOcasa', JSON.stringify(payload));
    console.log('Recepción OCASA guardada:', payload);
  }
}

