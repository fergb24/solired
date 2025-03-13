import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.authService.isLoggedIn() && user.is_admin) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirige a la página principal si no es admin
      return false;
    }
  }
}