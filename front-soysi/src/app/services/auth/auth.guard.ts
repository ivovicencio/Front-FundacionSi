import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth } from './auth';
import { DEV_AUTH_BYPASS } from '../../app.settings';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Si estamos en modo desarrollo y se quiere permitit acceso sin backend,
    // usamos el flag `DEV_AUTH_BYPASS` para permitir la navegación sin validar.
    if (DEV_AUTH_BYPASS) {
      return of(true);
    }
    return this.auth.isLoggedIn().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
