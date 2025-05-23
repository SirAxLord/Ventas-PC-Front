import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.service'; 

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromLocalStorage());
  public items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  constructor() { }


  private getCartFromLocalStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
      const cartJson = localStorage.getItem('myCart');
      return cartJson ? JSON.parse(cartJson) : [];
    }
    return []; 
  }

  private saveCartToLocalStorage(items: CartItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('myCart', JSON.stringify(items));
      this.itemsSubject.next(items); 
    }
  }

  // Obtener todos los items del carrito
  getCartItems(): Observable<CartItem[]> {
    return this.items$;
  }

  // Obtener el número total de artículos
  getCartItemCount(): Observable<number> {
    return this.items$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }

  // Calcular el precio total del carrito
  getCartTotalPrice(): Observable<number> {
    return this.items$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
  }


  addItem(productToAdd: Product, quantity: number = 1): void {
    const currentItems = [...this.itemsSubject.value]; 
    const existingItemIndex = currentItems.findIndex(item => item.product._id === productToAdd._id);

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      currentItems.push({ product: productToAdd, quantity });
    }
    this.saveCartToLocalStorage(currentItems);
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const currentItems = [...this.itemsSubject.value];
    const itemIndex = currentItems.findIndex(item => item.product._id === productId);

    if (itemIndex > -1) {
      if (quantity > 0) {
        currentItems[itemIndex].quantity = quantity;
      } else {
        currentItems.splice(itemIndex, 1);
      }
      this.saveCartToLocalStorage(currentItems);
    }
  }

  removeItem(productId: string): void {
    const currentItems = this.itemsSubject.value.filter(item => item.product._id !== productId);
    this.saveCartToLocalStorage(currentItems);
  }

  clearCart(): void {
    this.saveCartToLocalStorage([]);
  }
}