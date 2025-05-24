import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ServiceService, Service } from '../../services/service.service'; 

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service: Service | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  isAuthError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isLoading = true;
          this.errorMessage = null;
          this.service = null;
          this.isAuthError = false;
          return this.serviceService.getServiceById(id);
        } else {
          this.isLoading = false;
          const specificErrorMessage = 'No se especificó un ID de servicio.';
          this.errorMessage = specificErrorMessage;
          this.isAuthError = false;
          return throwError(() => new Error(specificErrorMessage));
        }
      })
    ).subscribe({
      next: (response: { result: Service }) => { 
        this.service = response.result;
        this.isLoading = false;
        this.isAuthError = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.errorMessage = 'Para ver los detalles completos de este servicio, por favor inicia sesión.';
          this.isAuthError = true;
        } else if (err && err.message && err.message === 'No se especificó un ID de servicio.') {
          this.errorMessage = err.message;
          this.isAuthError = false;
        } else {
          this.errorMessage = 'Ocurrió un error al cargar los detalles del servicio.';
          this.isAuthError = false;
          console.error('Error fetching service by ID:', err);
        }
      }
    });
  }

  contactForService(): void {
    if (this.service) {
      this.router.navigate(['/contactanos'], { queryParams: { servicio: this.service.title } });
    } else {
      this.router.navigate(['/contactanos']);
    }
  }

  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}