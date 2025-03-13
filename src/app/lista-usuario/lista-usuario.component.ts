import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  usuarios: any[] = []; // Array para almacenar la lista de usuarios

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsuarios(); // Llama al método para obtener usuarios al inicializar el componente
  }

  getUsuarios(): void {
    this.authService.getUsers().subscribe(
      (data) => {
        this.usuarios = data; // Asigna la respuesta a la variable usuarios
      },
      (error) => {
        console.error('Error al obtener usuarios', error); // Manejo de errores
      }
    );
  }
}