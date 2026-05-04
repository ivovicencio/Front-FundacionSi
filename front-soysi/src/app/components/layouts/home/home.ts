import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  usuario = {
    nombre: 'Ivo Vicencio',
    rol: 'ADMIN',
    esStockActivo: true
  };

  fraseDelDia = 'La vida es como una bicicleta, para mantener el equilibrio debes seguir adelante. - Albert Einstein';

  //GETTERS PARA CONTROLAR LA VISIBILIDAD DE TARJETAS Y FUNCIONALIDADES
  get puedeGestionarOperaciones(){
    return this.usuario.rol === 'ADMIN' || this.usuario.rol === 'RESIDENTE_STOCK';
  }

  get esAdmin(){
    return this.usuario.rol === 'ADMIN';
  }

  get esEstudiante(){
    return this.usuario.rol === 'RESIDENTE_NORMAL' || this.usuario.rol === 'RESIDENTE_STOCK';
  }
}
