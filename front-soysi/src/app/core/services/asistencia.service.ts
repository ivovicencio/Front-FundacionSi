import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia, AsistenciaFilter } from '../models/asistencia.models';

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  private apiBase = '/api';

  constructor(private http: HttpClient) {}

  registrar(fecha: string, presente: boolean): Observable<Asistencia> {
    return this.http.post<Asistencia>(`${this.apiBase}/asistencias`, { fecha, presente });
  }

  getAll(filter?: AsistenciaFilter): Observable<Asistencia[]> {
    let params = new HttpParams();
    if (filter?.usuario) params = params.set('usuario', filter.usuario);
    if (filter?.fecha) params = params.set('fecha', filter.fecha);
    if (filter?.page !== undefined) params = params.set('page', filter.page);
    if (filter?.size !== undefined) params = params.set('size', filter.size);
    return this.http.get<Asistencia[]>(`${this.apiBase}/asistencias`, { params });
  }

  getById(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.apiBase}/asistencias/${id}`);
  }
}
