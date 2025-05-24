import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // 👈 IMPORTA Router

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
    private snackBar: MatSnackBar,
    private router: Router 
  ) {}

  addToCart(event: MouseEvent): void {
    event.stopPropagation(); 
    if (this.product) {
      this.cartService.addItem(this.product);
      this.snackBar.open(`${this.product.title} añadido al carrito`, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  viewDetails(): void {
    if (this.product && this.product._id) {
      this.router.navigate(['/producto', this.product._id]);
    } else {
      console.error('Producto o ID del producto no disponible.', this.product);
    }
  }
}