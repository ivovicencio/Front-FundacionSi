import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
  Servicio Auth (comentarios en español)

  Resumen:
  - Este servicio encapsula las llamadas al backend relacionadas con autenticación.
  - Usa el concepto de "token" (JWT u otro) porque es la forma más común
    de mantener una sesión sin depender del estado del servidor.

  ¿Por qué token?
  - El backend emite un token (por ejemplo JWT) cuando el usuario se autentica.
  - El frontend guarda ese token y lo envía en el header `Authorization: Bearer <token>`
    en las siguientes peticiones para identificar al usuario.
  - Ventajas: escalabilidad (stateless), fácil invalidación por blacklist, y control de permisos.

  Nota sobre seguridad:
  - Almacenamos el token en `localStorage` para simplicidad (se puede cambiar a memory o cookies
    con `HttpOnly` para mayor seguridad). Si se usan refresh tokens, hay que implementarlos
    en el backend y manejar su expiración aquí.

  Endpoints esperados (ajustar si el backend tiene rutas distintas):
  - POST /auth/login      -> { token: string, usuario: {...} }
  - POST /auth/register   -> creación de usuario
  - POST /auth/logout     -> invalidar token en backend (opcional)

  Ajustes comunes:
  - Cambiar `apiBase` si el backend corre en otra URL (ej: http://localhost:8080/api)
  - Adaptar el tratamiento de la respuesta de `login` según el formato real devuelto
    por el backend (por ejemplo: token en `data.token` o `accessToken`).
*/

interface LoginPayload {
  email: string;
  dni: string;
  password: string;
}

interface RegisterPayload {
  nombre: string;
  email: string;
  dni: string;
  rol?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Base de la API: cambiar según el entorno/backend real
  private apiBase = '/api';
  // Clave usada en localStorage para guardar el token
  private tokenKey = 'soysi_token';

  constructor(private http: HttpClient) {}

  /**
   * login
   * - Envía credenciales al backend y espera, típicamente, un objeto con un token.
   * - El componente que llame a este método debe guardar el token con `setToken()`
   *   si la respuesta contiene el token.
   */
  login(payload: LoginPayload): Observable<any> {
    // Aquí se hace el POST al endpoint de login. No guardamos el token automáticamente
    // para dejar al componente la decisión (por ejemplo validar campos, mostrar errores).
    return this.http.post(`${this.apiBase}/auth/login`, payload);
  }

  /**
   * register
   * - Registra un nuevo usuario. Dependiendo del backend puede devolver el usuario creado
   *   o directamente autenticarlo y devolver un token.
   */
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiBase}/auth/register`, payload);
  }

  /**
   * logout
   * - Intenta notificar al backend para invalidar el token (si el backend soporta blacklist).
   * - Borra el token en el frontend en cualquier caso.
   */
  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    // Petición al backend para invalidar token; si falla igualmente borramos el token local.
    const req = this.http.post(`${this.apiBase}/auth/logout`, {}, { headers });
    req.subscribe({ next: () => this.clearToken(), error: () => this.clearToken() });
    return req;
  }

  // Guarda el token en localStorage. Alternativas: usar un servicio en memoria o cookies seguras.
  // NOTA: no usamos `localStorage` por seguridad y porque el backend va a gestionar
  // la persistencia (cookies HttpOnly o sesiones). Aquí mantenemos un token en memoria
  // solo en caso de que el backend devuelva uno y se quiera usar en headers.
  private inMemoryToken: string | null = null;

  setToken(token: string) {
    this.inMemoryToken = token;
  }

  // Devuelve el token almacenado en memoria (no persistente entre recargas).
  getToken(): string | null {
    return this.inMemoryToken;
  }

  clearToken() {
    this.inMemoryToken = null;
  }

  /**
   * isLoggedIn
   * - Intentamos validar la sesión consultando al backend.
   * - El endpoint `/auth/me` es un ejemplo: adapta si tu backend expone otro.
   * - Devuelve Observable<boolean> que indica si la sesión es válida.
   */
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.http.get(`${this.apiBase}/auth/me`).subscribe({
        next: () => {
          subscriber.next(true);
          subscriber.complete();
        },
        error: () => {
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });
  }
}
