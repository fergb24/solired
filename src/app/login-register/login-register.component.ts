import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isLogin = true;

  // Formulario Login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Formulario Registro
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    isAdmin: new FormControl('false') // Valor por defecto es 'false'
  }, { validators: this.passwordMatchValidator });

  // Validador de coincidencia de contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { passwordMismatch: true } 
      : null;
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onSubmit() {
    if (this.isLogin) {
      if (this.loginForm.valid) {
        console.log('Datos Login:', this.loginForm.value);
      }
    } else {
      if (this.registerForm.valid) {
        console.log('Datos Registro:', this.registerForm.value);
      }
    }
  }

  // Helpers para acceder a los controles
  get lEmail() { return this.loginForm.get('email'); }
  get lPassword() { return this.loginForm.get('password'); }
  
  get rFullName() { return this.registerForm.get('fullName'); }
  get rEmail() { return this.registerForm.get('email'); }
  get rUsername() { return this.registerForm.get('username'); }
  get rPhone() { return this.registerForm.get('phone'); }
  get rPassword() { return this.registerForm.get('password'); }
  get rConfirmPassword() { return this.registerForm.get('confirmPassword'); }
}