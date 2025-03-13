import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/register'; // URL del endpoint de registro
  private loginUrl = 'http://localhost:3000/login'; // URL del endpoint de inicio de sesión
  private userUrl = 'http://localhost:3000/user'; // URL del endpoint para obtener información del usuario
  private usersUrl = 'http://localhost:3000/users'; // URL del endpoint para obtener todos los usuarios

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<AuthResponse> { // Cambia el tipo de retorno
    return this.http.post<AuthResponse>(this.loginUrl, { email, password }).pipe(
      tap(response => {
        // Almacena el token y la información del usuario en localStorage
        localStorage.setItem('token', response.token); // Almacena el token
        localStorage.setItem('user', JSON.stringify(response.user)); // Almacena la información del usuario
      })
    );
  }

  // Método para obtener información del usuario
  getUser (): Observable<any> {
    return this.http.get(this.userUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de enviar el token en el encabezado
      }
    });
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token en el almacenamiento local
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    localStorage.removeItem('user'); // Elimina la información del usuario
  }
  
  // Método para eliminar un usuario
  deleteUser (userId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}