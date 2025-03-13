import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solired';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.is_admin; // Verifica si el usuario es administrador
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']); // Redirige a la página de login/registro
  }

  // Método para navegar a la página de perfil
  navigateToProfile(): void {
    this.router.navigate(['/perfil']); // Redirige a la página de perfil
  }

  // Método para navegar a la página de login/registro
  navigateToLogin(): void {
    this.router.navigate(['/auth']); // Redirige a la página de login/registro
  }

  // Método para manejar el clic en el botón
  handleButtonClick(): void {
    if (this.isLoggedIn()) {
      this.navigateToProfile(); // Si está autenticado, redirige a perfil
    } else {
      this.navigateToLogin(); // Si no está autenticado, redirige a login/registro
    }
  }
}