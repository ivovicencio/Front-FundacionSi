import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  dni = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.dni) {
      this.error = 'Ingresá email y DNI';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, dni: this.dni }).subscribe({
      next: (res) => {
        if (!res.passwordCambiada) {
          this.router.navigate(['/change-password']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al iniciar sesión. Verificá tus credenciales.';
        this.loading = false;
      }
    });
  }
}
