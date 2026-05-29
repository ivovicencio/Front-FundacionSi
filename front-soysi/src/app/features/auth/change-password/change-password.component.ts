import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  loading = false;
  error = '';
  success = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.error = 'Completá todos los campos';
      return;
    }

    if (this.newPassword.length < 8) {
      this.error = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    if (!/[A-Z]/.test(this.newPassword)) {
      this.error = 'La contraseña debe contener al menos una mayúscula';
      return;
    }

    if (!/[0-9]/.test(this.newPassword)) {
      this.error = 'La contraseña debe contener al menos un número';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    this.auth.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al cambiar la contraseña';
        this.loading = false;
      }
    });
  }
}
