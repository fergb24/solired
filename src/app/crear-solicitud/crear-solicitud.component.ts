import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      problema: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  enviarSolicitud() {
    if (this.solicitudForm.valid) {
      console.log('Solicitud enviada:', this.solicitudForm.value);
      // Aquí se puede agregar la lógica para enviar la solicitud a la API
      this.solicitudForm.reset();
    }
  }
}