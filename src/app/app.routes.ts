import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component'; // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Ruta para la página de bienvenida
  { path: 'auth', component: LoginRegisterComponent }, // Ruta para el login/registro
  { path: '**', redirectTo: '' } // Redirección para rutas desconocidas
];