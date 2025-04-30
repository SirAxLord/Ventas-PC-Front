import { Component, Input } from '@angular/core'; // Importa Input
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';     // Para <mat-card>
import { MatButtonModule } from '@angular/material/button';   // Para el botón
import { MatIconModule } from '@angular/material/icon';     // Para el icono del header
// Si usaras Lucide: import { LucideAngularModule } from 'lucide-angular';
import { Product } from '../products-section/products-section.component'; // Importa la interfaz

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,    // <-- Importa módulos Material necesarios aquí
    MatButtonModule,
    MatIconModule
    // Si usaras Lucide: LucideAngularModule
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // Define una propiedad de entrada 'product' que recibirá datos del padre
  // Usa el signo '!' para indicar que será inicializado por el padre (Input binding)
  @Input() product!: Product;
}