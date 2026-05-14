import { Injectable } from '@angular/core';

/**
 * Servicio de almacenamiento abstracto.
 * - Actualmente usa un mapa en memoria para NO depender de localStorage.
 * - Cuando el backend esté listo, reemplazar los métodos por llamadas HTTP
 *   que persistan los estados en el servidor.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}
