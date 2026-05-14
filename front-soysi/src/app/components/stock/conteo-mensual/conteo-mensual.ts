import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../../services/storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**el proposito general es poner si hay, el producto
 * y luego poner el peso neto, cuantos paquetes, fardos
 * y ahi en el total tiene que salir cuando en unidad hay en kg, ltrs, segun 
 * el producto, que no salga un numero raro como 1900 que salga
 * exactamente el kg, o el litro, o la cantidad de unidades, segun corresponda
 */

interface ItemMensual {
  nombreProducto: string;
  estadoHay: 'M' | 'P' | 'N';
  pesoNeto: number;
  cantidadPaquetes: number;
  fardos: number;
  unidad: 'KG' | 'G' | 'L' | 'ML' | 'UNIDAD';
  total: number;

}

@Component({
  selector: 'app-conteo-mensual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conteo-mensual.html',
  styleUrls: ['./conteo-mensual.css'],
})

export class ConteoMensual implements OnInit {

  private storage = inject(StorageService);

  items: ItemMensual[] = [
    {
      nombreProducto: 'Arroz',
      estadoHay: 'M',
      pesoNeto: 10,
      cantidadPaquetes: 5,
      fardos: 2,
      unidad: 'KG',
      total: 100
    },
    {
      nombreProducto: 'Fideos "Matarazzo"',
      estadoHay: 'N',
      pesoNeto: 0,
      cantidadPaquetes: 0,
      fardos: 0,
      unidad: 'G',
      total: 0
    },
    {
      nombreProducto: 'Aceite "Cocinero"',
      estadoHay: 'M',
      pesoNeto: 5,
      cantidadPaquetes: 3,
      fardos: 1,
      unidad: 'L',
      total: 15
    }
  ];

  ngOnInit(): void {
    const saved = this.storage.getItem('conteoMensual');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ItemMensual[];
        this.items = parsed;
      } catch {
        // ignorar error de parseo 
      }
    }
    
    this.items.forEach(i => this.calcularTotal(i));
  }

  calcularTotal(item: ItemMensual): void {
    if (item.estadoHay === 'N') {
      item.total = 0;
      return;
    }

    let total = 0;
    switch (item.unidad) {
      case 'KG':
        total = item.pesoNeto * item.cantidadPaquetes * item.fardos;
        break;
      case 'G':
        total = (item.pesoNeto / 1000) * item.cantidadPaquetes * item.fardos; // result in Kg
        break;
      case 'L':
        total = item.pesoNeto * item.cantidadPaquetes * item.fardos;
        break;
      case 'ML':
        total = (item.pesoNeto / 1000) * item.cantidadPaquetes * item.fardos; // result in L
        break;
      case 'UNIDAD':
        total = item.cantidadPaquetes * item.fardos;
        break;
    }

  
    if (item.unidad === 'UNIDAD') {
      item.total = Math.round(total);
    } else {
      // para pesos/volumenes muestra 2 decimales (o 3 si < 1)
      if (total >= 1) {
        item.total = Math.round(total * 100) / 100;
      } else {
        item.total = Math.round(total * 1000) / 1000;
      }
    }
  }

  agregarItem(){
    this.items.push({
      nombreProducto: '',
      estadoHay: 'N',
      pesoNeto: 0,
      cantidadPaquetes: 0,
      fardos: 0,
      unidad: 'KG',
      total: 0
    })
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  getDisplayUnit(item: ItemMensual) {
    if (item.unidad === 'G' || item.unidad === 'KG') return 'Kg';
    if (item.unidad === 'ML' || item.unidad === 'L') return 'Lts';
    return 'unidades';
  }

  formatTotal(item: ItemMensual) {
    if (item.total === 0) return '0';
    const unit = this.getDisplayUnit(item);
    // formato con decimales 
    if (unit === 'unidades') return `${item.total}`;
    return `${item.total} ${unit}`;
  }


 //pendiente en el backend
 guardarConteo(): void{
  console.log('Conteo mensual guardado:', this.items);
  this.storage.setItem('conteoMensual', JSON.stringify(this.items));
 }


}
