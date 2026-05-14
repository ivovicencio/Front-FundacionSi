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
  usuario = {
    nombre: 'Ivo Vicencio',
    rol: 'ADMIN'
  };

  fraseDelDia: string = "Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, puede cambiar el mundo.";


  get esAdmin(): boolean { return this.usuario.rol === 'ADMIN'; }
  get esStock(): boolean { return this.usuario.rol === 'RESIDENTE_STOCK'; }
  get esEstudiante(): boolean { return this.usuario.rol !== 'ADMIN'; }
  get puedeGestionarOperaciones(): boolean { 
    return this.esAdmin || this.esStock; 
  }

  ngOnInit(): void {
    //ver despues de llamar a algun servicio de frases motivacionales o algo asi
  }
}