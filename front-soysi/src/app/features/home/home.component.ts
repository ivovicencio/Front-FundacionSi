import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RolUsuario } from '../../core/models/auth.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  nombre = '';
  rol: RolUsuario | null = null;
  fraseDelDia = 'Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, puede cambiar el mundo.';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.nombre = user.nombre;
        this.rol = user.rol;
      }
    });
  }

  get esAdmin(): boolean { return this.rol === 'ADMIN'; }
  get esStock(): boolean { return this.rol === 'RESIDENTE_STOCK'; }
  get esResidente(): boolean { return this.rol === 'RESIDENTE'; }
  get puedeGestionarOperaciones(): boolean { return this.esAdmin || this.esStock; }
  get puedePedirBoleto(): boolean { return this.esResidente || this.esStock; }
}
