import { Routes } from '@angular/router';

//layouts y auth
import { Home } from './components/layouts/home/home';
import { Login } from './services/login';
import { Register } from './services/register';

//modulo del menu
import { MenuView } from './components/menu/menu-view/menu-view';
import { MenuEditor } from './components/menu/menu-editor/menu-editor';

//conteos y modulos de stock
import { ConteoMensual } from './components/stock/conteo-mensual/conteo-mensual';
import { ConteoSemanal } from './components/stock/conteo-semanal/conteo-semanal';
import { ConteoOcasa } from './components/stock/conteo-ocasa/conteo-ocasa';
import { PedidosGenerados } from './components/stock/pedidos-generados/pedidos-generados';
import { AsignarStock } from './services/asignar-stock';

//modulo de asistencias
import { AsistenciaPanel } from './components/asistencia/asistencia-panel/asistencia-panel';
import { AsistenciaForm } from './components/asistencia/asistencia-form/asistencia-form';

//modulo de encuestas
import { Encuesta } from './services/encuesta';
import { Boletos } from './services/boletos';

export const routes: Routes = [
     // Ruta inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Dashboard Principal
  { path: 'home', component: Home },

  // Módulo de Menú
  { path: 'menu/view', component: MenuView },
  { path: 'menu/editor', component: MenuEditor },

  // Módulo de Stock y Conteos
  { path: 'stock/semanal', component: ConteoSemanal },
  { path: 'stock/mensual', component: ConteoMensual },
  { path: 'stock/ocasa', component: ConteoOcasa },
  { path: 'stock/pedidos', component: PedidosGenerados },
  { path: 'stock/asignar-grupo', component: AsignarStock },

  // Módulo de Asistencias
  { path: 'asistencia/form', component: AsistenciaForm },
  { path: 'asistencia/panel', component: AsistenciaPanel },

  // Módulo de Encuestas
  { path: 'encuesta', component: Encuesta },
  { path: 'boletos/solicitud', component: Boletos },

  // Redirección de seguridad
  { path: '**', redirectTo: 'home' }
];
