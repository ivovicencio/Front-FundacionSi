import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RolUsuario } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as RolUsuario[];
    const userRol = this.auth.getRol();

    if (!userRol || !allowedRoles.includes(userRol)) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
