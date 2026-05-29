import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../core/services/menu.service';
import { Menu } from '../../../core/models/menu.models';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css',
})
export class MenuViewComponent implements OnInit {
  menu: Menu | null = null;
  loading = true;
  error = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getCurrent().subscribe({
      next: (data) => {
        this.menu = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el menú. Verificá la conexión con el backend.';
        this.loading = false;
      }
    });
  }

  getLabel(dia: any): string {
    return dia.almuerzo ? 'Almuerzo' : 'Cena';
  }

  getCarneLabel(conCarne: boolean): string {
    return conCarne ? 'Con carne' : 'Sin carne';
  }
}
