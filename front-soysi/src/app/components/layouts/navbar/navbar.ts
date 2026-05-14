import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  // Datos que vendrán del AuthService (JWT)[cite: 4]
  usuario = {
    nombre: 'Ivo Vicencio',
    rol: 'RESIDENTE_STOCK' // ADMIN, RESIDENTE_STOCK, RESIDENTE[cite: 3]
  };

  constructor() {}

  ngOnInit(): void {}

  // Getter para activar el efecto visual de stock
  get esStockActivo(): boolean {
    return this.usuario.rol === 'RESIDENTE_STOCK';
  }

  get inicial(): string {
    return this.usuario.nombre.charAt(0).toUpperCase();
  }
}