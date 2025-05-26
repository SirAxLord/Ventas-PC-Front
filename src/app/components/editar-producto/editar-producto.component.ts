import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService, Product, ProductCreationData } from '../../services/product.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CdkTextareaAutosize,
    MatSnackBarModule
  ],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  product: ProductCreationData | null = null;
  productId: string | null = null;
  isLoading: boolean = true;
  initialErrorMessage: string | null = null;
  initialProductStateString: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      take(1),
      switchMap(params => {
        this.productId = params.get('id');
        if (this.productId) {
          this.isLoading = true;
          this.initialErrorMessage = null;
          return this.productService.getProductById(this.productId);
        } else {
          this.isLoading = false;
          const specificErrorMessage = 'No se proporcionó un ID de producto para editar.';
          this.initialErrorMessage = specificErrorMessage;
          this.router.navigate(['/admin']);
          return throwError(() => new Error(specificErrorMessage));
        }
      })
    ).subscribe({
      next: (response) => {
        const fetchedProduct = response.result;
        if (fetchedProduct) {
          this.product = {
            title: fetchedProduct.title,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            iconName: fetchedProduct.iconName,
            image: fetchedProduct.image
          };
          this.initialProductStateString = JSON.stringify(this.product);
        } else {
          this.initialErrorMessage = 'Producto no encontrado.';
          this.router.navigate(['/admin']);
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.initialErrorMessage = 'No tienes autorización para ver este producto.';
        } else if (err && err.message) {
            this.initialErrorMessage = err.message;
        } else {
          this.initialErrorMessage = 'No se pudo cargar la información del producto.';
        }
        console.error('Error al cargar el producto:', err);
      }
    });
  }

  loadProductData(id: string): void {
    this.isLoading = true;
    this.initialErrorMessage = null;
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        const fetchedProduct = response.result;
        if (fetchedProduct) {
          this.product = {
            title: fetchedProduct.title,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            iconName: fetchedProduct.iconName,
            image: fetchedProduct.image
          };
          this.initialProductStateString = JSON.stringify(this.product);
        } else {
            this.initialErrorMessage = 'Producto no encontrado al reintentar.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al recargar el producto:', err);
        this.initialErrorMessage = 'No se pudo recargar la información del producto.';
      }
    });
  }

  isFormChanged(): boolean {
    if (!this.product) return false;
    return JSON.stringify(this.product) !== this.initialProductStateString;
  }

  onSubmit(productForm?: NgForm): void {
    if (!this.product || !this.productId) {
      this.snackBar.open('No hay datos de producto o ID para actualizar.', 'Cerrar', { duration: 3000, panelClass: ['valenzos-snackbar'] });
      return;
      
    }

    if (productForm && !productForm.form.valid) {
      this.snackBar.open('Por favor, completa todos los campos requeridos correctamente.', 'Cerrar', { duration: 3000, panelClass: ['valenzos-snackbar'] });
      Object.values(productForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    if (this.product.price === null || this.product.price <= 0) {
      this.snackBar.open('El precio es requerido y debe ser un número positivo.', 'Cerrar', { duration: 3000, panelClass: ['valenzos-snackbar'] });
      if (productForm?.controls['price']) {
        productForm.controls['price'].setErrors({'incorrect': true});
        productForm.controls['price'].markAsTouched();
      }
      return;
    }

    if (!this.isFormChanged()) {
      this.snackBar.open('No se detectaron cambios en el producto.', 'Cerrar', { duration: 3000, panelClass: ['valenzos-snackbar'] });
      return;
    }

    this.isLoading = true;

    const iconNameToUse = (this.product.iconName && this.product.iconName.trim() !== '')
                          ? this.product.iconName
                          : 'inventory_2';

    const productDataToUpdate: ProductCreationData = {
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        iconName: iconNameToUse,
        image: this.product.image
    };

    this.productService.updateProduct(this.productId, productDataToUpdate).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open(`Producto "${this.product?.title || ''}" actualizado con éxito.`, 'Ok', { duration: 3000, panelClass: ['valenzos-snackbar'] });
        this.initialProductStateString = JSON.stringify(this.product);
        if(productForm) productForm.form.markAsPristine();
        
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al actualizar el producto:', err);
        const errMessage = err.error?.msg || 'Error al actualizar el producto.';
        this.snackBar.open(errMessage, 'Cerrar', { duration: 5000, panelClass: ['valenzos-snackbar'] });
      }
    });
  }
}