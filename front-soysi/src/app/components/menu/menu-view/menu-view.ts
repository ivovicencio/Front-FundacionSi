import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PlatoDia, SemanaMenu } from '../../../services/menu';

@Component({
  selector: 'app-menu-view',
  imports: [CommonModule],
  templateUrl: './menu-view.html',
  styleUrl: './menu-view.css',
})
export class MenuView implements OnInit {
  private ngZone = inject(NgZone);
  private readonly storageKey = 'hoysecome_manual_final_v2';

  menuData!: SemanaMenu;
  rangoEditable = 'Lunes 30/03/2026 al Domingo 05/04/2026';
  generandoPDF = false;
  modalPdfVisible = false;

  private readonly nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  ngOnInit(): void {
    if (!this.cargarEstado()) {
      this.vaciarVistaSinPersistir();
    }
  }

  /** Misma grilla vacía que `limpiarMenu()` del editor, sin escribir storage */
  private vaciarVistaSinPersistir(): void {
    const lunesEmpiezaConCarne = true;
    const dias: PlatoDia[] = this.nombresDias.map((diaNombre, i) => {
      const almuerzoConCarne = lunesEmpiezaConCarne ? i % 2 === 0 : i % 2 !== 0;
      return {
        diaNombre,
        fechaStr: '',
        almuerzo: { texto: '', conCarne: almuerzoConCarne },
        cena: { texto: '', conCarne: !almuerzoConCarne },
      };
    });
    this.menuData = { rangoFechas: this.rangoEditable, fechaInicio: '', fechaFin: '', dias };
  }

  exportarPDF(): void {
    this.generandoPDF = true;
    const data = document.getElementById('menu-export');
    if (!data) {
      this.generandoPDF = false;
      return;
    }

    const originalStyle = data.getAttribute('style') || '';

    data.style.width = '1200px';
    data.style.maxWidth = 'none';

    html2canvas(data, {
      scale: 2,
      windowWidth: 1200,
      useCORS: true,
      backgroundColor: '#ffffff',
    })
      .then((canvas) => {
        data.setAttribute('style', originalStyle);

        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const yPos = imgHeight < 210 ? (210 - imgHeight) / 2 : 10;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, yPos, imgWidth, imgHeight);
        pdf.save(`Menu_${this.rangoEditable.replace(/\//g, '-')}.pdf`);

        this.ngZone.run(() => {
          this.generandoPDF = false;
          this.modalPdfVisible = true;
        });
      })
      .catch((err) => {
        console.error('Error al exportar PDF:', err);
        data.setAttribute('style', originalStyle);
        this.ngZone.run(() => {
          this.generandoPDF = false;
        });
      });
  }

  cerrarModalPdf(): void {
    this.modalPdfVisible = false;
  }

  private cargarEstado(): boolean {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return false;
    try {
      const data = JSON.parse(raw) as {
        rangoEditable: string;
        menuData: SemanaMenu;
      };
      this.rangoEditable = data.rangoEditable;
      this.menuData = data.menuData;
      return true;
    } catch {
      return false;
    }
  }
}
