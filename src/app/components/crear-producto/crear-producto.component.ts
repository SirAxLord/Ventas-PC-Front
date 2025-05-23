import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
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

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.product.price === null) {
        this.errorMessage = "El precio no puede estar vacío.";
        return;
    }
    
    const productDataToSend = {
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        iconName: this.product.iconName,
        image: this.product.image
    };

    this.productService.createProduct(productDataToSend).subscribe({
      next: (response) => {
        this.successMessage = `¡Producto "${response.title}" creado con éxito! ID: ${response._id}`;
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el producto. ' + (error.error?.msg || '');
      }
    });
  }
}