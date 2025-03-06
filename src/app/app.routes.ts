import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Página de bienvenida
  { path: '**', redirectTo: '' } // Redirección para rutas desconocidas
];
