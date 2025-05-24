import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router'; // 👈 Importa Router
import { AuthService, AuthResponse } from '../../services/auth.service'; // 👈 Importa AuthService y AuthResponse

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
  hidePassword = true;
  loginError: string | null = null; // Para mostrar mensajes de error

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // 👈 Inyecta AuthService
    private router: Router            // 👈 Inyecta Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.loginError = null; // Resetea el error en cada intento
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: AuthResponse) => { // El token ya se guarda en el servicio gracias al .pipe(tap())
          console.log('Login exitoso:', response);
          // El servicio AuthService.login ya guarda el token y el método loginSuccess (si lo tenías así antes)
          // o la lógica dentro del pipe(tap()) se encarga.
          // Navegamos al inicio
          this.router.navigate(['/']); // O a la ruta que desees después del login
        },
        (error) => {
          console.error('Error en el login:', error);
          if (error.status === 400 || error.status === 401) {
            this.loginError = 'Nombre de usuario o contraseña incorrectos.';
          } else {
            this.loginError = 'Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.';
          }
          // Opcional: Podrías leer error.error.msg si tu backend lo envía consistentemente
          // this.loginError = error.error?.msg || 'Error desconocido.';
        }
      );
    } else {
      console.log('Formulario de Login no válido');
      this.loginError = 'Por favor, completa todos los campos correctamente.';
      this.loginForm.markAllAsTouched();
    }
  }
}