import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, filter, take } from 'rxjs/operators';

import { ServiceService, Service, ServiceCreationData } from '../../services/service.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-service',
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
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'] 
})
export class EditServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  serviceId: string | null = null;
  isLoading: boolean = true; 
  isSaving: boolean = false;  
  initialFormValue: string = '';

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      iconName: ['', Validators.required]
    });

    this.route.paramMap.pipe(
      take(1), 
      switchMap(params => {
        this.serviceId = params.get('id');
        if (this.serviceId) {
          this.isLoading = true;
          return this.serviceService.getServiceById(this.serviceId);
        } else {
          this.isLoading = false;
          this.snackBar.open('ID de servicio no encontrado.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin']); 
          return []; 
        }
      })
    ).subscribe({
      next: (response: { result: Service }) => { 
        const serviceData = response.result;
        if (serviceData) {
          this.serviceForm.patchValue({
            title: serviceData.title,
            description: serviceData.description,
            iconName: serviceData.iconName
          });
          this.initialFormValue = JSON.stringify(this.serviceForm.value); 
        } else {
          this.snackBar.open('Servicio no encontrado.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin']);
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error al cargar el servicio:', err);
        let message = 'No se pudo cargar el servicio.';
        if (err instanceof HttpErrorResponse && err.status === 401) {
          message = 'No tienes autorización para ver este servicio.';
        }
        this.snackBar.open(message, 'Cerrar', { duration: 5000 });
        this.router.navigate(['/admin']); 
      }
    });
  }

  get formChanged(): boolean {
    return JSON.stringify(this.serviceForm.value) !== this.initialFormValue;
  }

  onSubmit(): void {
    if (!this.serviceId) {
      this.snackBar.open('Error: ID de servicio no disponible para la actualización.', 'Cerrar', { duration: 3000 });
      return;
    }

    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      this.snackBar.open('Por favor, corrige los errores en el formulario.', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.formChanged && !this.serviceForm.dirty) { 
      this.snackBar.open('No se han detectado cambios.', 'Cerrar', { duration: 3000 });
      this.isSaving = false;
      return;
    }

    this.isSaving = true;
    const serviceDataToUpdate: ServiceCreationData = this.serviceForm.value;

    this.serviceService.updateService(this.serviceId, serviceDataToUpdate).subscribe({
      next: () => {
        this.isSaving = false;
        this.snackBar.open(`Servicio "${serviceDataToUpdate.title}" actualizado con éxito.`, 'Ok', { duration: 3000 });
        this.initialFormValue = JSON.stringify(this.serviceForm.value); 
        this.serviceForm.markAsPristine(); 
       
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error al actualizar el servicio:', err);
        const errorMessage = err.error?.msg || 'No se pudo actualizar el servicio. Inténtalo de nuevo.';
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
}