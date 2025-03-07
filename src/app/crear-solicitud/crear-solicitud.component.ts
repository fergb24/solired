import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.solicitudForm = this.fb.group({
      problema: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  enviarSolicitud() {
    if (this.solicitudForm.valid) {
      const solicitudData = {
        problema_sol: this.solicitudForm.value.problema,
        descripcion_sol: this.solicitudForm.value.descripcion,
        aceptada_sol: false // Establece el valor por defecto para aceptada_sol
      };
  
      const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado
  
      this.http.post('http://localhost:3000/solicitudes', solicitudData, {
        headers: {
          Authorization: `Bearer ${token}` // Incluye el token en el encabezado
        }
      })
      .subscribe(
        response => {
          console.log('Solicitud enviada:', response);
          this.solicitudForm.reset(); // Resetea el formulario
          this.router.navigate(['/solicitudes']); // Redirige a la página de solicitudes
        },
        error => {
          console.error('Error al enviar la solicitud', error);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
      );
    }
  }
}