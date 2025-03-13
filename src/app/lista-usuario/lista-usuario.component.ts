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

  confirmDelete(userId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario? Recuerda que si hay solicitudes pendientes de este usuario, también se eliminaran')) {
      this.authService.deleteUser (userId).subscribe(
        () => {
          // Eliminar el usuario de la lista local después de la eliminación exitosa
          this.usuarios = this.usuarios.filter(usuario => usuario.id_usu !== userId);
          alert('Usuario eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
          alert('Error al eliminar el usuario');
        }
      );
    }
  }
}