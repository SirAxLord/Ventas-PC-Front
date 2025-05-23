import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../../services/cart.service'; 
import { Product } from '../../services/product.service'; 

import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';       
import { FormsModule } from '@angular/forms';                   
import { MatDividerModule } from '@angular/material/divider';   

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  itemCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
    this.totalPrice$ = this.cartService.getCartTotalPrice();
    this.itemCount$ = this.cartService.getCartItemCount();
  }

  updateQuantity(item: CartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let newQuantity = parseInt(inputElement.value, 10);

    if (isNaN(newQuantity)) { 
        inputElement.value = item.quantity.toString();
        return;
    }
    
    if (newQuantity < 0) { 
        newQuantity = 0; 
        inputElement.value = newQuantity.toString();
    }

    this.cartService.updateItemQuantity(item.product._id, newQuantity);
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  trackByProductId(index: number, item: CartItem): string {
    return item.product._id; 
  }

  proceedToCheckout(): void {
    alert('Procediendo al checkout (¡Funcionalidad pendiente!)');
    console.log('Checkout iniciado...');
  }
}