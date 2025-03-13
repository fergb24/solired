import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null; // Propiedad para almacenar la información del usuario
  loading: boolean = true; // Propiedad para manejar el estado de carga
  errorMessage: string | null = null; // Propiedad para almacenar mensajes de error
  isEditing: boolean = false; // Propiedad para controlar el modo de edición

  constructor(private authService: AuthService, private router: Router) {}

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

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  // Método para actualizar la información del usuario
  updateUser (): void {
    this.authService.updateUser (this.user).subscribe(
      (response) => {
        alert('Información del usuario actualizada con éxito'); // Mensaje de éxito
        this.isEditing = false; // Cambia a modo de visualización
      },
      (error) => {
        console.error('Error al actualizar la información del usuario', error);
        alert('Error al actualizar la información del usuario'); // Mensaje de error
      }
    );
  }
}