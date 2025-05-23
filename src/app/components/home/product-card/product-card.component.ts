// En src/app/components/product-card/product-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule 
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar 
  ) {}

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product);
      
      // Mostrar el Snackbar
      this.snackBar.open(`${this.product.title} añadido al carrito`, 'Cerrar', {
        duration: 3000, // Duración del msj
        horizontalPosition: 'center',
        verticalPosition: 'bottom',   
      });
    }
  }
}