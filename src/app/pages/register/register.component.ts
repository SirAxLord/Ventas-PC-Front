import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router'; // 👈 Importa Router y RouterLink
import { AuthService } from '../../services/auth.service'; // 👈 Importa AuthService

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink // 👈 Asegúrate que RouterLink esté aquí
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  registerError: string | null = null;
  registerSuccess: string | null = null; // Para mensaje de éxito

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // 👈 Inyecta AuthService
    private router: Router            // 👈 Inyecta Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    this.registerError = null;
    this.registerSuccess = null;
    if (this.registerForm.valid) {
      // Excluimos confirmPassword ya que no se envía al backend
      const { confirmPassword, ...userData } = this.registerForm.value;
      // Como dijiste, el rol se asignará por defecto en el backend, así que no lo enviamos.
      
      this.authService.register(userData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.registerSuccess = '¡Registro exitoso! Ahora puedes iniciar sesión.';
          // Opcional: Redirigir a login después de unos segundos o dejar que el usuario haga clic
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // Redirige después de 2 segundos
        },
        (error) => {
          console.error('Error en el registro:', error);
          if (error.status === 400 && error.error?.msg === "El usuario ya existe") {
            this.registerError = 'Este nombre de usuario ya está en uso. Por favor, elige otro.';
          } else {
            this.registerError = 'Error al intentar registrar el usuario. Por favor, inténtalo de nuevo.';
          }
          // Opcional: this.registerError = error.error?.msg || 'Error desconocido.';
        }
      );
    } else {
      console.log('Formulario de Registro no válido');
      this.registerError = 'Por favor, completa todos los campos correctamente y asegúrate de que las contraseñas coincidan.';
      this.registerForm.markAllAsTouched();
    }
  }
}