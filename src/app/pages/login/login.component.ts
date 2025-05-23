import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router'; // Para el enlace a "Registrarse"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true; // Para el botón de mostrar/ocultar contraseña

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Datos del formulario de Login:', this.loginForm.value);
      // Aquí es donde, en el futuro, llamarías a:
      // this.authService.login(this.loginForm.value).subscribe(
      //   response => { /* Manejar respuesta exitosa, guardar token, redirigir */ },
      //   error => { /* Manejar error de login */ }
      // );
    } else {
      console.log('Formulario de Login no válido');
      // Marcar todos los campos como 'touched' para mostrar errores de validación si no lo hacen ya
      this.loginForm.markAllAsTouched();
    }
  }
}