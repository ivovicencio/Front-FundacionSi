import { Routes } from '@angular/router';

//layouts y auth
import { Home } from './components/layouts/home/home';
import { AuthGuard } from './services/auth/auth.guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

//modulo del menu
import { MenuView } from './components/menu/menu-view/menu-view';
import { MenuEditor } from './components/menu/menu-editor/menu-editor';

//conteos y modulos de stock
import { ConteoMensual } from './components/stock/conteo-mensual/conteo-mensual';
import { ConteoSemanal } from './components/stock/conteo-semanal/conteo-semanal';
import { ConteoOcasa } from './components/stock/conteo-ocasa/conteo-ocasa';
import { PedidosGenerados } from './components/stock/pedidos-generados/pedidos-generados';
import { AsignarStock } from './components/asignar-stock/asignar-stock';
import { PanelStock } from './components/stock/panel-stock/panel-stock';

//modulo de asistencias
import { AsistenciaPanel } from './components/asistencia/asistencia-panel/asistencia-panel';
import { AsistenciaForm } from './components/asistencia/asistencia-form/asistencia-form';

//modulo de encuestas
import { Encuesta } from './components/encuesta/encuesta';
import { Boletos } from './components/boletos/boletos';

export const routes: Routes = [
     // Ruta inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Dashboard Principal
  { path: 'home', component: Home },

  //  Menú
  { path: 'menu/view', component: MenuView, canActivate: [AuthGuard] },
  { path: 'menu/editor', component: MenuEditor, canActivate: [AuthGuard] },

  //  Stock y Conteos
  { path: 'stock/semanal', component: ConteoSemanal, canActivate: [AuthGuard] },
  { path: 'stock/mensual', component: ConteoMensual, canActivate: [AuthGuard] },
  { path: 'stock/ocasa', component: ConteoOcasa, canActivate: [AuthGuard] },
  { path: 'stock/pedidos', component: PedidosGenerados, canActivate: [AuthGuard] },
  { path: 'stock/asignar-grupo', component: AsignarStock, canActivate: [AuthGuard] },
  { path: 'stock/panel', component: PanelStock, canActivate: [AuthGuard] },

  //  Asistencias
  { path: 'asistencia/form', component: AsistenciaForm, canActivate: [AuthGuard] },
  { path: 'asistencia/panel', component: AsistenciaPanel, canActivate: [AuthGuard] },

  //  Encuestas
  { path: 'encuesta', component: Encuesta, canActivate: [AuthGuard] },
  { path: 'boletos/solicitud', component: Boletos, canActivate: [AuthGuard] },

  // Redirección de seguridad
  { path: '**', redirectTo: 'home' }
];
