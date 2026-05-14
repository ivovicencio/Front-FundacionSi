import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  // Datos simulados que vendrán del AuthService via JWT[cite: 4]
  usuario = {
    nombre: 'Ivo Vicencio',
    rol: 'RESIDENTE_STOCK' // ADMIN, RESIDENTE_STOCK, RESIDENTE[cite: 3]
  };

  fraseDelDia: string = "Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, puede cambiar el mundo.";

  // Getters para control de UI limpio[cite: 15]
  get esAdmin(): boolean { return this.usuario.rol === 'ADMIN'; }
  get esStock(): boolean { return this.usuario.rol === 'RESIDENTE_STOCK'; }
  get esEstudiante(): boolean { return this.usuario.rol !== 'ADMIN'; }
  get puedeGestionarOperaciones(): boolean { 
    return this.esAdmin || this.esStock; 
  }

  ngOnInit(): void {
    // Aquí podrías llamar a un servicio de frases o noticias
  }
}