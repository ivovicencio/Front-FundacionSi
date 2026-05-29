import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu, CreateMenuRequest } from '../models/menu.models';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private apiBase = '/api';

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiBase}/menus/current`);
  }

  getHistory(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiBase}/menus/history`);
  }

  create(payload: CreateMenuRequest): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiBase}/menus`, payload);
  }

  update(id: number, payload: CreateMenuRequest): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiBase}/menus/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/menus/${id}`);
  }
}
