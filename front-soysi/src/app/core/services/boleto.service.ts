import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoletoConfig } from '../models/boleto.models';

@Injectable({ providedIn: 'root' })
export class BoletoService {
  private apiBase = '/api';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<BoletoConfig> {
    return this.http.get<BoletoConfig>(`${this.apiBase}/boletos/config`);
  }

  updateConfig(config: BoletoConfig): Observable<BoletoConfig> {
    return this.http.put<BoletoConfig>(`${this.apiBase}/boletos/config`, config);
  }
}
