import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; //preparado para la api

interface Residente {
  id: number;
  nombre: string;
  rol: 'ADMIN' | 'RESIDENTE_STOCK' | 'RESIDENTE'; 
}

@Component({
  selector: 'app-asignar-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './asignar-stock.html',
  styleUrl: './asignar-stock.css'
})
export class AsignarStock implements OnInit {
  residentesDisponibles: Residente[] = [];
  grupoSeleccionado: Residente[] = [];
  grupoActualActivo: boolean = false;
  loading: boolean = false;


  //define la cantidad minima requerida por regla de negocio
  readonly MINIMO_INTEGRANTES = 3;

  constructor() { }

  //al iniciar, ejecuta la carga de datos del servidor
  ngOnInit(): void {
    this.cargarDatos();
  }

  //trae los datos desde el back
  cargarDatos(): void {
    this.loading = true;
  
    //NOTA: aca se va a conectar con los servicios
    //por ejemplo forkJoin([this.userService.getDisponibles()
    this.residentesDisponibles = [] //inicializar vacio para recibir los datos
    this.loading = false;
  }

  //agrega o remueve el residente de la seleccion, no es necesario que sea 3 pero el minimo es 3
  toggleSeleccion(resi: Residente): void {
    const yaSeleccionado = this.grupoSeleccionado.some(r => r.id === resi.id);

    if (yaSeleccionado) {
      this.grupoSeleccionado = this.grupoSeleccionado.filter(r => r.id !== resi.id);
    } else {
      this.grupoSeleccionado = [...this.grupoSeleccionado, resi];
    }
  }
// valida que se cumpla el minimo de integrantes
  get esGrupoValido(): boolean {
    return this.grupoSeleccionado.length >= this.MINIMO_INTEGRANTES;
  }

  //envia el nuevo grupo con 3 integrantes al backend
  confirmarGrupo(): void {
    if (!this.esGrupoValido) return;

    this.loading = true;
    
    //aca se conecta el post enviando los ids 
    console.log('Enviando grupo al backend:', this.grupoSeleccionado);

    this.grupoActualActivo = true;
    this.grupoSeleccionado = [];
    this.loading = false;
  }

  

  

  //finaliza el turno del grupo mediante la api
  eliminarGrupoActual(): void {
    this.loading = true;

    //aca se va a esperar al DELETE
    this.grupoActualActivo = false;
    this.loading = false;
  }
}