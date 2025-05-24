import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ServiceService, ServiceCreationData } from '../../services/service.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  serviceForm!: FormGroup; 
  isLoading: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      iconName: ['', Validators.required] 
    });
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched(); // Marcar todos los campos para mostrar errores
      this.snackBar.open('Por favor, corrige los errores en el formulario.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    const serviceData: ServiceCreationData = this.serviceForm.value;

    this.serviceService.createService(serviceData).subscribe({
      next: (newService) => {
        this.isLoading = false;
        this.snackBar.open(`Servicio "${newService.title}" creado con éxito.`, 'Ok', { duration: 3000 });
        this.serviceForm.reset();
        
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al crear el servicio:', err);
        const errorMessage = err.error?.msg || 'No se pudo crear el servicio. Inténtalo de nuevo.';
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
}