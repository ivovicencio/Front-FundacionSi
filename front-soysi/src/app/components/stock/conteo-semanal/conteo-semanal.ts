import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ItemSemanal {
  nombre: string;
  categoria: 'VERDURA' | 'FRUTA' | 'HUEVO' | 'QUESO' | 'CARNE_ROJA' | 'POLLO';
  unidad: 'KG' | 'G' | 'L' | 'ML' | 'UNIDAD' | 'MAPLE';
  cantidadActual: number;
  cantidadObjetivo: number;
}

@Component({
  selector: 'app-conteo-semanal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conteo-semanal.html',
  styleUrls: ['./conteo-semanal.css'],
})
export class ConteoSemanal implements OnInit {
  items: ItemSemanal[] = [
    { nombre: 'Tomate', categoria: 'VERDURA', unidad: 'KG', cantidadActual: 0, cantidadObjetivo: 0 },
    { nombre: 'Papa', categoria: 'VERDURA', unidad: 'KG', cantidadActual: 0, cantidadObjetivo: 0 },
    { nombre: 'Banana', categoria: 'FRUTA', unidad: 'KG', cantidadActual: 0, cantidadObjetivo: 0 },
    { nombre: 'Huevo', categoria: 'HUEVO', unidad: 'MAPLE', cantidadActual: 0, cantidadObjetivo: 0 },
    { nombre: 'Queso cremoso', categoria: 'QUESO', unidad: 'KG', cantidadActual: 0, cantidadObjetivo: 0 }
  ];


  getPedidoSugerido(item: ItemSemanal): number {
    const diferencia = (item.cantidadObjetivo || 0) - (item.cantidadActual || 0);
    return diferencia > 0 ? diferencia : 0;
  }


  confirmarConteo(): void {
    console.log('Conteo semanal confirmado:', this.items);
    localStorage.setItem('conteoSemanal', JSON.stringify(this.items));
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('conteoSemanal');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ItemSemanal[];
        this.items = parsed;
      } catch {
        // ignore parse error
      }
    }
  }

  agregarItem(): void {
    this.items.push({ nombre: '', categoria: 'VERDURA', unidad: 'KG', cantidadActual: 0, cantidadObjetivo: 0 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  getDisplayUnit(item: ItemSemanal) {
    if (item.unidad === 'KG' || item.unidad === 'G') return 'Kg';
    if (item.unidad === 'ML' || item.unidad === 'L') return 'Lts';
    return 'unidades';
  }

  formatPedido(item: ItemSemanal) {
    const val = this.getPedidoSugerido(item);
    if (!val) return '0';
    const unit = this.getDisplayUnit(item);
    return unit === 'unidades' ? `${val}` : `${val} ${unit}`;
  }
}
