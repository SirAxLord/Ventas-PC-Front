
import { HttpErrorResponse } from '@angular/common/http'; 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  isAuthError: boolean = false; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isLoading = true;
          this.errorMessage = null;
          this.product = null;
          this.isAuthError = false; 
          return this.productService.getProductById(id);
        } else {
          this.isLoading = false;
          const specificErrorMessage = 'No se especificó un ID de producto.';
          this.errorMessage = specificErrorMessage;
          this.isAuthError = false;
          return throwError(() => new Error(specificErrorMessage));
        }
      })
    ).subscribe({
      next: (response: { result: Product }) => {
        this.product = response.result;
        this.isLoading = false;
        this.isAuthError = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.errorMessage = 'Para ver los detalles completos de este producto, por favor inicia sesión o crea una cuenta.';
          this.isAuthError = true; 
        } else if (err && err.message && err.message === 'No se especificó un ID de producto.') {
            this.errorMessage = err.message;
            this.isAuthError = false;
        } else {
            this.errorMessage = 'Ocurrió un error al cargar los detalles del producto.';
            this.isAuthError = false;
            console.error('Error fetching product by ID:', err);
        }
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product);
      this.snackBar.open(`${this.product.title} añadido al carrito`, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}