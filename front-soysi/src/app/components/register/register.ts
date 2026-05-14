import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';

type RolUsuario = 'ADMIN' | 'RESIDENTE_NORMAL';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  nuevoUsuario = {
    nombre: '',
    email: '',
    dni: '',
    rol: 'RESIDENTE_NORMAL' as RolUsuario,
    esStockActivo: false
  };

  roles: { value: RolUsuario; label: string }[] = [
    { value: 'ADMIN', label: 'Admin (Voluntario)' },
    { value: 'RESIDENTE_NORMAL', label: 'Residente' }
  ];

  constructor(private router: Router, private auth: Auth) {}

  onRegister(){
    // Llamamos al endpoint de registro. Según backend puede requerir permisos (solo ADMIN).
    this.auth.register({
      nombre: this.nuevoUsuario.nombre,
      email: this.nuevoUsuario.email,
      dni: this.nuevoUsuario.dni,
      rol: this.nuevoUsuario.rol
    }).subscribe({
      next: (res:any) => {
        alert('Registro exitoso');
        // Volvemos al login para que el admin o el usuario inicie sesión.
        this.router.navigate(['/login']);
      },
      error: (err:any) => {
        console.error('Error al registrar', err);
        alert(err?.error?.message || 'Error al crear usuario');
      }
    });
  }
}
