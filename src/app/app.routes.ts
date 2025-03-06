import { Routes } from '@angular/router';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth', component: LoginRegisterComponent },
  { path: 'crear-solicitud', component: CrearSolicitudComponent },
];