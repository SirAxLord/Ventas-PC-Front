import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Puedes reusar el CSS de login o crear uno nuevo
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      // email: ['', [Validators.required, Validators.email]], // Podrías añadir un campo email
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para asegurar que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Datos del formulario de Registro:', this.registerForm.value);
      // Aquí es donde, en el futuro, llamarías a:
      // const { confirmPassword, ...userData } = this.registerForm.value; // Excluir confirmPassword
      // this.authService.register(userData).subscribe(
      //   response => { /* Manejar respuesta exitosa, quizá redirigir a login */ },
      //   error => { /* Manejar error de registro */ }
      // );
    } else {
      console.log('Formulario de Registro no válido');
      this.registerForm.markAllAsTouched();
    }
  }
}