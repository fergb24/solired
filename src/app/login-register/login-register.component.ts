import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isLogin: boolean = true; // Estado inicial para mostrar el formulario de login
  email: string = '';
  password: string = '';

  toggleForm() {
    this.isLogin = !this.isLogin; // Cambia entre login y registro
  }

  onSubmit() {
    // Aquí puedes manejar el envío del formulario
    if (this.isLogin) {
      // Lógica para iniciar sesión
      console.log('Iniciar sesión con:', this.email, this.password);
    } else {
      // Lógica para registrarse
      console.log('Registrarse con:', this.email, this.password);
    }
  }
}