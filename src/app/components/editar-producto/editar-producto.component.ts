import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, ProductCreationData } from '../../services/product.service'; 

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule 
  ],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  product: ProductCreationData | null = null;
  productId: string | null = null;
  isLoading: boolean = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  initialProductState: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id'); 

    if (this.productId) {
      this.loadProductData(this.productId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No se proporcionó un ID de producto para editar.';
    }
  }

  loadProductData(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        const fetchedProduct = response.result;
        this.product = {
          title: fetchedProduct.title,
          description: fetchedProduct.description,
          price: fetchedProduct.price,
          iconName: fetchedProduct.iconName,
          image: fetchedProduct.image
        };
        this.initialProductState = JSON.stringify(this.product);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.errorMessage = 'No se pudo cargar la información del producto. ' + (err.error?.msg || 'Intenta más tarde.');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.product || !this.productId) {
      this.errorMessage = 'No hay datos de producto o ID para actualizar.';
      return;
    }
    
    if (JSON.stringify(this.product) === this.initialProductState) {
      this.successMessage = 'No se detectaron cambios en el producto.';
      setTimeout(() => { this.successMessage = null; }, 3000);
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.product.price === null || this.product.price === undefined) {
        this.errorMessage = 'El precio es requerido.';
        this.isLoading = false;
        return;
    }
    
    const productDataToUpdate: ProductCreationData = {
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        iconName: this.product.iconName,
        image: this.product.image
    };

    this.productService.updateProduct(this.productId, productDataToUpdate).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = `Producto "${this.product?.title || ''}" actualizado con éxito.`;
        console.log('Respuesta de actualización:', response);
        this.initialProductState = JSON.stringify(this.product); 
        
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al actualizar el producto:', err);
        this.errorMessage = 'Error al actualizar el producto. ' + (err.error?.msg || 'Verifica los datos e intenta de nuevo.');
      }
    });
  }
}