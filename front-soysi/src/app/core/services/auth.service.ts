import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse, ChangePasswordRequest, JwtPayload, RolUsuario } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBase = '/api';
  private tokenKey = 'soysi_token';
  private userSubject = new BehaviorSubject<AuthResponse | null>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarSesion();
  }

  private cargarSesion(): void {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        this.userSubject.next({
          token,
          userId: payload.userId,
          email: payload.email,
          rol: payload.rol,
          nombre: '',
          passwordCambiada: true
        });
      } else {
        this.clearToken();
      }
    }
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBase}/auth/login`, payload).pipe(
      tap(res => {
        this.setToken(res.token);
        this.userSubject.next(res);
      })
    );
  }

  changePassword(payload: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${this.apiBase}/auth/change-password`, payload);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiBase}/auth/logout`, {}).pipe(
      tap(() => this.clearSession())
    );
  }

  logoutLocal(): void {
    this.clearSession();
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  private setToken(token: string): void {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch {}
  }

  private clearToken(): void {
    try {
      localStorage.removeItem(this.tokenKey);
    } catch {}
  }

  private clearSession(): void {
    this.clearToken();
    this.userSubject.next(null);
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  getRol(): RolUsuario | null {
    const user = this.userSubject.value;
    return user?.rol ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  mustChangePassword(): boolean {
    const user = this.userSubject.value;
    return user ? !user.passwordCambiada : false;
  }
}
