import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  //el dni es con lo primero que entraria como password pero una vez dentro se le pide que cambie a una mas fuerte, ya que el admin los registra pero luego el usuario debe cambiarla
  password: string = ''
  dni: string = '';
  whatsappNumber: string = '5491112345678';
  constructor(private router: Router, private auth: Auth) {}

  getWhatsappLink(){
    return 'https://wa.me/' + this.whatsappNumber + '?text=' + encodeURIComponent('Hola, necesito que me registren en el sistema SoySi.');
  }

  onLogin(){
    // En la documentación del backend el login usa email + dni.
    // Mandamos email y dni; si el backend devuelve un token lo guardamos.
    if(!this.email || !this.dni){
      alert('Ingrese email y DNI');
      return;
    }

    this.auth.login({ email: this.email, dni: this.dni, password: this.password })
      .subscribe({
        next: (res: any) => {
          // Ajustar según formato: buscamos `token` o `accessToken`.
          const token = res?.token || res?.accessToken || res?.data?.token;
          if(token){
            this.auth.setToken(token);
            this.router.navigate(['/home']);
          } else {
            // Si no viene token, asumimos login exitoso según backend y navegamos.
            this.router.navigate(['/home']);
          }
        },
        error: (err: any) => {
          console.error('Login error', err);
          alert(err?.error?.message || 'Error al autenticar');
        }
      });
  }
}
