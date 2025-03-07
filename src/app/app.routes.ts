import { Routes } from '@angular/router';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ProfileComponent } from './profile/profile.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth', component: LoginRegisterComponent },
  { path: 'crear-solicitud', component: CrearSolicitudComponent },
  { path: 'perfil', component: ProfileComponent }, 
  { path: 'solicitudes', component: SolicitudComponent },
];