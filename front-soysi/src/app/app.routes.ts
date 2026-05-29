import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./features/auth/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu/view',
    loadComponent: () => import('./features/menu/menu-view/menu-view.component').then(m => m.MenuViewComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu/editor',
    loadComponent: () => import('./features/menu/menu-editor/menu-editor.component').then(m => m.MenuEditorComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'RESIDENTE_STOCK'] }
  },
  {
    path: 'asistencia/form',
    loadComponent: () => import('./features/asistencia/asistencia-form/asistencia-form.component').then(m => m.AsistenciaFormComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['RESIDENTE', 'RESIDENTE_STOCK'] }
  },
  {
    path: 'asistencia/panel',
    loadComponent: () => import('./features/asistencia/asistencia-panel/asistencia-panel.component').then(m => m.AsistenciaPanelComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'boletos/solicitud',
    loadComponent: () => import('./features/boletos/boletos.component').then(m => m.BoletosComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['RESIDENTE', 'RESIDENTE_STOCK'] }
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./features/usuarios/usuario-lista/usuario-lista.component').then(m => m.UsuarioListaComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
