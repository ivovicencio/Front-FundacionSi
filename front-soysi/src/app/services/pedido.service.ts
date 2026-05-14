import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage';

/**
 * PedidoService
 * - Contiene la lógica para convertir un `conteo` y `personas` en un pedido sugerido.
 * - Las reglas reales deberían venir del backend; aquí implementamos un motor
 *   local simple para poder trabajar en UI y lógica.
 */
@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiBase = '/api';

  // reglas por defecto; pueden modificarse desde UI y/o provenir del backend
  private reglas: Record<string, any> = {
    fideos: { porPersona30dias: 2000, unidad: 'g' }, // 2kg por persona por mes
    arroz: { porPersona30dias: 4000, unidad: 'g' }, // 4kg
    aceite: { porPersona30dias: 400, unidad: 'ml' },
  };

  constructor(private http: HttpClient, private storage: StorageService) {
    // intentar cargar reglas desde storage en memoria (si fueron guardadas en sesión)
    const raw = this.storage.getItem('reglas_pedido');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.reglas = { ...this.reglas, ...parsed };
      } catch {
        // ignorar
      }
    }
  }

  setReglas(newReglas: Record<string, any>) {
    this.reglas = { ...this.reglas, ...newReglas };
    // guardar en storage en memoria para mantener entre navegación durante sesión
    try {
      this.storage.setItem('reglas_pedido', JSON.stringify(this.reglas));
    } catch {}
  }

  getReglas() {
    return this.reglas;
  }

  /**
   * generarPedidoFromConteo
   * payload: { tipo: 'MENSUAL'|'SEMANAL', conteo: any[], personas: number }
   * devuelve array [{ nombre, cantidad, unidad, detalle }]
   */
  generarPedidoFromConteo(payload: any): any[] {
    const { tipo, conteo, personas } = payload;

    const reglas = this.reglas || {};

    // Mapear conteo para saber stock actual por producto
    const stockMap: Record<string, number> = {};
    (conteo || []).forEach((item: any) => {
      const nombre = (item.nombreProducto || item.nombre || '').toLowerCase();
      const cantidad = item.total || 0;
      stockMap[nombre] = (stockMap[nombre] || 0) + cantidad;
    });

    const pedido: any[] = [];

    // Para cada regla, calcular cantidad necesaria y restar stock
    for (const key of Object.keys(reglas)) {
      const rule = reglas[key];
      const necesaria = reglaOrZero(rule.porPersona30dias) * (personas || 0);
      const stockActual = stockMap[key] || 0;
      let pendiente = necesaria - stockActual;
      if (pendiente < 0) pendiente = 0;
      pedido.push({ nombre: key, cantidad: Math.round(pendiente), unidad: rule.unidad });
    }

    // También incluir items del conteo que no están en reglas (sugerir reponer si 0)
    (conteo || []).forEach((item: any) => {
      const n = (item.nombreProducto || item.nombre || '').toLowerCase();
      if (!reglas[n]) {
        const actual = stockMap[n] || 0;
        if (actual === 0) {
          pedido.push({ nombre: n, cantidad: 1, unidad: item.unidad || 'u' });
        }
      }
    });

    return pedido;
  }

  /**
   * sendPedido
   * - Intenta enviar el pedido al backend (POST /pedidos). Devuelve el Observable.
   * - Si no hay backend disponible, devuelve `of({ok:false})`.
   */
  sendPedido(pedido: any): Observable<any> {
    try {
      return this.http.post(`${this.apiBase}/pedidos`, pedido);
    } catch (e) {
      return of({ ok: false, error: 'no-backend' });
    }
  }
}

function reglaOrZero(v: any) {
  return typeof v === 'number' ? v : 0;
}
