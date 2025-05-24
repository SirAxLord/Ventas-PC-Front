import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  handleProductDeleted(deletedProductId: string): void {
    this.products = this.products.filter(product => product._id !== deletedProductId);
    console.log(`Producto con ID ${deletedProductId} eliminado de la lista en ProductsSectionComponent.`);
  }
}