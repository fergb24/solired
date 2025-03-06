import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class ProfileComponent implements OnInit {
  user: any; // Propiedad para almacenar la información del usuario

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Llama al método getUser () para obtener la información del usuario
    this.authService.getUser ().subscribe(
      (data) => {
        this.user = data; // Almacena la información del usuario
      },
      (error) => {
        console.error('Error al obtener la información del usuario', error);
      }
    );
  }
}