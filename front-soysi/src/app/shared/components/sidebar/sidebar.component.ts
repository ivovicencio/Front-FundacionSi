import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RolUsuario } from '../../../core/models/auth.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  nombre = '';
  inicial = '';
  rol: RolUsuario | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.nombre = user.nombre;
        this.inicial = user.nombre?.charAt(0)?.toUpperCase() || '?';
        this.rol = user.rol;
      }
    });
  }

  get esAdmin(): boolean { return this.rol === 'ADMIN'; }
  get esStock(): boolean { return this.rol === 'RESIDENTE_STOCK'; }
  get esResidente(): boolean { return this.rol === 'RESIDENTE'; }
  get puedeGestionarMenu(): boolean { return this.esAdmin || this.esStock; }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.auth.logoutLocal();
        this.router.navigate(['/login']);
      }
    });
  }
}
