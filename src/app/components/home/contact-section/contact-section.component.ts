import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa lo necesario para Reactive Forms
import { MatFormFieldModule } from '@angular/material/form-field'; // Para <mat-form-field>
import { MatInputModule } from '@angular/material/input';       // Para <input matInput>, <textarea matInput>
import { MatButtonModule } from '@angular/material/button';     // Para el botón de envío

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  // <-- Importa ReactiveFormsModule
    MatFormFieldModule, // <-- Módulos de Material para el formulario
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css']
})
export class ContactSectionComponent implements OnInit { // Implementa OnInit
  contactForm!: FormGroup; // Declara la propiedad para el FormGroup

  // Inyecta FormBuilder en el constructor
  constructor(private fb: FormBuilder) {}

  // ngOnInit es un buen lugar para inicializar el formulario
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      // Define los controles del formulario y sus validaciones
      firstName: ['', Validators.required], // Campo requerido
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Requerido y formato email
      message: ['', Validators.required]
    });
  }

  // Método que se llamará al enviar el formulario
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulario Enviado:', this.contactForm.value);
      // Aquí iría la lógica para enviar los datos
      // (p.ej., llamar a un servicio que haga una petición HTTP a tu backend)
      // Por ahora, solo lo mostramos en consola y reseteamos.
      this.contactForm.reset();
    } else {
      console.log('Formulario inválido.');
      // Opcional: marcar campos como 'touched' para mostrar errores
      this.contactForm.markAllAsTouched();
    }
  }
}