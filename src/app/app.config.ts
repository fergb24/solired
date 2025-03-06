import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';  // <--- Importa ReactiveFormsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule)  // <--- Añade ReactiveFormsModule aquí
  ]
};