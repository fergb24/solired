import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/register'; // URL del endpoint de registro
  private loginUrl = 'http://localhost:3000/login'; // URL del endpoint de inicio de sesión
  private userUrl = 'http://localhost:3000/user'; // URL del endpoint para obtener información del usuario

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
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
  }
}