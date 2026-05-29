import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../core/services/menu.service';
import { CreateMenuRequest } from '../../../core/models/menu.models';

@Component({
  selector: 'app-menu-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-editor.component.html',
  styleUrl: './menu-editor.component.css',
})
export class MenuEditorComponent implements OnInit {
  fechaInicio = '';
  fechaFin = '';
  loading = false;
  success = false;
  error = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    const hoy = new Date();
    const lunes = this.getLunes(hoy);
    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);
    this.fechaInicio = this.formatDate(lunes);
    this.fechaFin = this.formatDate(domingo);
  }

  private getLunes(d: Date): Date {
    const date = new Date(d);
    const dia = date.getDay();
    const diff = dia === 0 ? 6 : dia - 1;
    date.setDate(date.getDate() - diff);
    return date;
  }

  private formatDate(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.error = 'Completá las fechas de inicio y fin';
      return;
    }

    if (this.fechaInicio >= this.fechaFin) {
      this.error = 'La fecha de fin debe ser posterior a la de inicio';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    const payload: CreateMenuRequest = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      diasMenu: []
    };

    this.menuService.create(payload).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al crear el menú';
        this.loading = false;
      }
    });
  }
}
