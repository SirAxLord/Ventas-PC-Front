import { Component } from '@angular/core';
import { ProductService, Product, ProductCreationData } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CdkTextareaAutosize,
    MatSnackBarModule 
  ],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  product: { title: string; description: string; price: number | null; iconName: string; image: string; } = {
    title: '',
    description: '',
    price: null,
    iconName: '',
    image: ''
  };


  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) { }

  onSubmit(productForm?: NgForm): void {
   

    if (productForm && !productForm.form.valid) {
      this.snackBar.open("Por favor, completa todos los campos requeridos.", "Cerrar", { duration: 3000,panelClass: ['valenzos-snackbar'] });
      Object.values(productForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    if (this.product.price === null || this.product.price <= 0) {
        this.snackBar.open("El precio no puede estar vacío y debe ser positivo.", "Cerrar", { duration: 3000,panelClass: ['valenzos-snackbar'] });
        if (productForm?.controls['price']) {
          productForm.controls['price'].setErrors({'incorrect': true});
          productForm.controls['price'].markAsTouched();
        }
        return;
    }
    
    const iconNameToUse = (this.product.iconName && this.product.iconName.trim() !== '') 
                          ? this.product.iconName 
                          : 'inventory_2'; 

    const productDataToSend: ProductCreationData = {
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        iconName: iconNameToUse,
        image: this.product.image
    };

    this.productService.createProduct(productDataToSend).subscribe({
      next: (response: Product) => {
        this.snackBar.open('Producto creado con éxito.', 'Ok', { duration: 3000, panelClass: ['valenzos-snackbar'] }); 
        
        this.product = { 
          title: '', 
          description: '', 
          price: null, 
          iconName: '', 
          image: '' 
        };
        if (productForm) {
          productForm.resetForm();
        }
        
        this.router.navigate(['/']);
      },
      error: (error) => {
        const errMessage = error.error?.msg || 'Error al crear el producto. Inténtalo de nuevo.';
        this.snackBar.open(errMessage, 'Cerrar', { duration: 5000, panelClass: ['valenzos-snackbar'] });
        console.error('Error al crear el producto:', error);
      }
    });
  }
}