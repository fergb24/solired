import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
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

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']); // Redirige a la página de login/registro
  }

  // Método para navegar a la página de login/registro
  navigateToLogin(): void {
    this.router.navigate(['/auth']);
  }
}