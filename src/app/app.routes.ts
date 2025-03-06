import { Routes } from '@angular/router';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ProfileComponent } from './profile/profile.component'; // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth', component: LoginRegisterComponent },
  { path: 'crear-solicitud', component: CrearSolicitudComponent },
  { path: 'perfil', component: ProfileComponent }, // Agrega esta línea para la ruta del perfil
];