import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User, CreateUserRequest } from '../../../core/models/user.models';
import { RolUsuario } from '../../../core/models/auth.models';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.css',
})
export class UsuarioListaComponent implements OnInit {
  usuarios: User[] = [];
  loading = true;
  showModal = false;
  editMode = false;
  selectedUser: User | null = null;

  form: CreateUserRequest & { id?: number } = {
    nombre: '',
    email: '',
    dni: '',
    rol: 'RESIDENTE'
  };

  roles: { value: RolUsuario; label: string }[] = [
    { value: 'ADMIN', label: 'Admin (Voluntario)' },
    { value: 'RESIDENTE_STOCK', label: 'Encargado de Stock' },
    { value: 'RESIDENTE', label: 'Residente' }
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.usuarios = [];
        this.loading = false;
      }
    });
  }

  abrirModal(user?: User): void {
    if (user) {
      this.editMode = true;
      this.selectedUser = user;
      this.form = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        dni: user.dni,
        rol: user.rol
      };
    } else {
      this.editMode = false;
      this.selectedUser = null;
      this.form = { nombre: '', email: '', dni: '', rol: 'RESIDENTE' };
    }
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  guardar(): void {
    if (this.editMode && this.selectedUser) {
      this.userService.update(this.selectedUser.id, {
        nombre: this.form.nombre,
        email: this.form.email,
        rol: this.form.rol
      }).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: () => alert('Error al actualizar usuario')
      });
    } else {
      this.userService.create(this.form).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: () => alert('Error al crear usuario')
      });
    }
  }

  eliminar(user: User): void {
    if (!confirm(`¿Dar de baja a ${user.nombre}?`)) return;
    this.userService.delete(user.id).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => alert('Error al eliminar usuario')
    });
  }

  getRolLabel(rol: RolUsuario): string {
    const r = this.roles.find(r => r.value === rol);
    return r ? r.label : rol;
  }
}
