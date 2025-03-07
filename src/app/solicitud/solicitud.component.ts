import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  solicitudes: any[] = []; // Array para almacenar las solicitudes
  loading: boolean = true; // Estado de carga
  errorMessage: string | null = null; // Mensaje de error

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSolicitudes(); // Llama al método para obtener las solicitudes al iniciar
  }

  // Método para obtener las solicitudes
  getSolicitudes(): void {
    this.http.get<any[]>('http://localhost:3000/solicitudes') // Asegúrate de que esta URL sea correcta
      .subscribe(
        (data) => {
          this.solicitudes = data; // Almacena las solicitudes
          this.loading = false; // Cambia el estado de carga a false
        },
        (error) => {
          console.error('Error al obtener las solicitudes', error);
          this.errorMessage = 'No se pudieron cargar las solicitudes.'; // Establece un mensaje de error
          this.loading = false; // Cambia el estado de carga a false
        }
      );
  }
}