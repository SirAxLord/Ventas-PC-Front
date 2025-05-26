import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../dialogs/confirm-dialog.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productDeleted = new EventEmitter<string>();

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    public authService: AuthService,
    private dialog: MatDialog, 
    private productService: ProductService
  ) {}

  addToCart(event: MouseEvent): void {
    event.stopPropagation();
    if (this.product) {
      this.cartService.addItem(this.product);
      this.snackBar.open(`${this.product.title} añadido al carrito`, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['valenzos-snackbar']
      });
    }
  }

  viewDetails(): void {
    if (this.product && this.product._id) {
      this.router.navigate(['/producto', this.product._id]);
    }
  }

  openDeleteConfirmDialog(event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que quieres eliminar el producto "${this.product.title}"?\nEsta acción no se puede deshacer.`,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'No, Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteProductExecute();
      }
    });
  }

  private deleteProductExecute(): void {
    if (!this.product || !this.product._id) return;

    this.productService.deleteProduct(this.product._id).subscribe({
      next: () => {
        this.snackBar.open(`"${this.product.title}" eliminado correctamente.`, 'Cerrar', { duration: 3000, panelClass: ['valenzos-snackbar'] });
        this.productDeleted.emit(this.product._id);
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        let errorMessage = `Error al eliminar "${this.product.title}".`;
        if (err && err.error && err.error.msg) {
          errorMessage = err.error.msg;
        } else if (err.status === 403) {
            errorMessage = "No tienes permiso para eliminar este producto."
        }
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 4000, panelClass: ['valenzos-snackbar'] });
      }
    });
  }
}