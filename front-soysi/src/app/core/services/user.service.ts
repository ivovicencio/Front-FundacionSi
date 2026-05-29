import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/user.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiBase = '/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBase}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiBase}/users/${id}`);
  }

  create(payload: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/users`, payload);
  }

  update(id: number, payload: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.apiBase}/users/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/users/${id}`);
  }
}
