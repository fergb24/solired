import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importa Router para redirigir

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

  constructor(private authService: AuthService, private router: Router) {} // Inyecta Router

  ngOnInit() {
    // Llama al método getUser  () para obtener la información del usuario
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
    this.authService.logout(); // Llama al método de logout del servicio
    this.router.navigate(['/auth']); // Redirige a la página de login/registro
  }
}