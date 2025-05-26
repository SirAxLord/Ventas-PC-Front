import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ServiceService, Service, ServiceCreationData } from '../../services/service.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CdkTextareaAutosize
  ],
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  serviceId: string | null = null;
  isLoading: boolean = true;
  isSaving: boolean = false;
  initialFormValueString: string = '';
  initialErrorMessage: string | null = null;

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
      iconName: ['']
    });

    this.route.paramMap.pipe(
      take(1),
      switchMap(params => {
        this.serviceId = params.get('id');
        if (this.serviceId) {
          this.isLoading = true;
          this.initialErrorMessage = null;
          return this.serviceService.getServiceById(this.serviceId);
        } else {
          this.isLoading = false;
          const specificErrorMessage = 'ID de servicio no encontrado.';
          this.initialErrorMessage = specificErrorMessage;
          this.router.navigate(['/admin']);
          return throwError(() => new Error(specificErrorMessage));
        }
      })
    ).subscribe({
      next: (response: { result: Service }) => {
        const serviceData = response.result;
        if (serviceData) {
          this.serviceForm.patchValue({
            title: serviceData.title,
            description: serviceData.description,
            iconName: serviceData.iconName || ''
          });
          this.initialFormValueString = JSON.stringify(this.serviceForm.value);
        } else {
          this.initialErrorMessage = 'Servicio no encontrado.';
          this.router.navigate(['/admin']);
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.initialErrorMessage = 'No tienes autorización para ver este servicio.';
        } else if (err && err.message) {
            this.initialErrorMessage = err.message;
        } else {
          this.initialErrorMessage = 'No se pudo cargar la información del servicio.';
        }
        console.error('Error al cargar el servicio:', err);
      }
    });
  }

  loadServiceData(id: string): void {
    this.isLoading = true;
    this.initialErrorMessage = null;
    this.serviceService.getServiceById(id).subscribe({
        next: (response) => {
            const serviceData = response.result;
            if (serviceData) {
                this.serviceForm.patchValue({
                    title: serviceData.title,
                    description: serviceData.description,
                    iconName: serviceData.iconName || ''
                });
                this.initialFormValueString = JSON.stringify(this.serviceForm.value);
            } else {
                this.initialErrorMessage = 'Servicio no encontrado al reintentar.';
            }
            this.isLoading = false;
        },
        error: (err) => {
            this.isLoading = false;
            this.initialErrorMessage = 'No se pudo recargar el servicio.';
            console.error('Error al recargar el servicio:', err);
        }
    });
  }

  get formChanged(): boolean {
    if (!this.serviceForm || !this.serviceForm.value) return false;
    return JSON.stringify(this.serviceForm.value) !== this.initialFormValueString;
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
      return;
    }

    this.isSaving = true;
    const formValue = this.serviceForm.value;
    
    const serviceDataToUpdate: ServiceCreationData = {
      title: formValue.title,
      description: formValue.description,
      iconName: (formValue.iconName && formValue.iconName.trim() !== '') ? formValue.iconName : 'settings_suggest'
    };

    this.serviceService.updateService(this.serviceId, serviceDataToUpdate).subscribe({
      next: () => {
        this.isSaving = false;
        this.snackBar.open(`Servicio "${serviceDataToUpdate.title}" actualizado con éxito.`, 'Ok', { duration: 3000 });
        this.initialFormValueString = JSON.stringify(this.serviceForm.value);
        this.serviceForm.markAsPristine();
        this.router.navigate(['/']);
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