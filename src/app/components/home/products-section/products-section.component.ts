import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component'; // Importa el componente hijo

// Opcional: Define una interfaz para la estructura del producto
export interface Product {
  title: string;
  description: string;
  price: string;
  iconName: string; // Nombre del icono (Material Icon o Lucide)
  imageUrl: string; // Ruta a la imagen del producto
}

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent // Necesitas importar el componente que vas a usar en el *ngFor
  ],
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent {
  // Array con los datos de los productos (similar al original)
  products: Product[] = [
    {
      title: "Laptop",
      description: "Equipo de alto rendimiento para gaming con iluminación RGB",
      price: "$1,499.99",
      iconName: "memory", // Icono Material (alternativa a Cpu)
      imageUrl: "URL_DE_LA_IMAGEN"
    },
    {
      title: "Ultrabook Laptop",
      description: "Laptop delgada y liviana con batería para todo el día",
      price: "$899.99",
      iconName: "laptop_chromebook", // Icono Material
      imageUrl: "URL_DE_LA_IMAGEN"
    },
    {
      title: "Laptop para Trabajo",
      description: "Pantalla ultra nítida con amplia gama de colores",
      price: "$349.99",
      iconName: "desktop_windows", // Icono Material
      imageUrl: "URL_DE_LA_IMAGEN"
    },
    {
      title: "Laptop para Estudiantes",
      description: "Almacenamiento sólido rápido y confiable",
      price: "$129.99",
      iconName: "hard_drive", // Icono Material (o 'save')
      imageUrl: "URL_DE_LA_IMAGEN"
    },
    {
      title: "Periféricos para Gaming",
      description: "Ratones de precisión y teclados mecánicos",
      price: "$89.99",
      iconName: "mouse", // Icono Material
      imageUrl: "assets/images/product-peripherals.png"
    },
    {
      title: "Equipo de Audio",
      description: "Auriculares y altavoces de alta fidelidad",
      price: "$149.99",
      iconName: "headphones", // Icono Material
      imageUrl: "assets/images/product-audio.png"
    },
  ];
}
