import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null; // Propiedad para almacenar la información del usuario, inicializada como null
  loading: boolean = true; // Propiedad para manejar el estado de carga
  errorMessage: string | null = null; // Propiedad para almacenar mensajes de error

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Llama al método getUser () para obtener la información del usuario
    this.authService.getUser ().subscribe(
      (data) => {
        this.user = data; // Almacena la información del usuario
        this.loading = false; // Cambia el estado de carga a false
      },
      (error) => {
        console.error('Error al obtener la información del usuario', error);
        this.errorMessage = 'No se pudo obtener la información del usuario.'; // Establece un mensaje de error
        this.loading = false; // Cambia el estado de carga a false
      }
    );
  }
}