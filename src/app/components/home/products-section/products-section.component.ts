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
      description: "High-performance custom gaming rig with RGB lighting",
      price: "$1,499.99",
      iconName: "memory", // Icono Material (alternativa a Cpu)
      imageUrl: "https://scontent.fslp3-1.fna.fbcdn.net/v/t39.30808-6/492551812_1225231109616237_5322211329802602524_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6o68SG0wGFgQ7kNvwHBxJdp&_nc_oc=AdmF32nF_jFwHPKp6Uke0yElvH45XqkasBRDzmYQ1jTLn7UZbqhmvz6aabAhxFgW5-QFjsP6VZzC_jNQ_3RiYu2C&_nc_zt=23&_nc_ht=scontent.fslp3-1.fna&_nc_gid=4ZCTtZTxWjOTWSpplIhBXQ&oh=00_AfEIvOsCE3W49aFP-1fu1WUJpxrq5c3mRcXizDbV7ZrkXw&oe=68174BAB" // <-- CAMBIA ESTA RUTA
    },
    {
      title: "Ultrabook Laptop",
      description: "Thin and light laptop with all-day battery life",
      price: "$899.99",
      iconName: "laptop_chromebook", // Icono Material
      imageUrl: "https://scontent.fslp3-1.fna.fbcdn.net/v/t39.30808-6/492040619_1224587553013926_7065308434307184372_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Zv4-l35-k-gQ7kNvwECpGfi&_nc_oc=Adk_Fj5r4N0PTsDb2iBJVJ7ZuZho7Q5ffUk85LcmyeJaOjTOV6Wic1BVKV955N4s_iUB8wBUqILvJO_-uzdzz9C_&_nc_zt=23&_nc_ht=scontent.fslp3-1.fna&_nc_gid=QD-m8tJnxALY7Ugv-q9bjA&oh=00_AfELfkfoTjQ3x7y7TIVg-GznIns8OqiX7N2bSpkpxlIkvw&oe=68172072" // <-- CAMBIA ESTA RUTA
    },
    {
      title: "Laptop for Work",
      description: "Ultra-sharp display with wide color gamut",
      price: "$349.99",
      iconName: "desktop_windows", // Icono Material
      imageUrl: "https://scontent.fslp3-1.fna.fbcdn.net/v/t39.30808-6/491995886_1224586779680670_8071221584922132096_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BnQted65ZXsQ7kNvwG9faaA&_nc_oc=AdkiLXjdiaNVaymudIutvsqFtrGIl4kUvZio7jLy0ThvHDUNk9UgLISkD3hlMCkn6eIBfmxPFEJgJiEggvL1kd1T&_nc_zt=23&_nc_ht=scontent.fslp3-1.fna&_nc_gid=Izl82bZH8wZtD1la2nSTpQ&oh=00_AfHYKEn0eoi_fFYnb5oF1ZRR1ArGSgym47otqIFn9x0F0g&oe=6817295F" // <-- CAMBIA ESTA RUTA
    },
    {
      title: "Laptop for Students",
      description: "Fast and reliable solid state storage solutions",
      price: "$129.99",
      iconName: "hard_drive", // Icono Material (o 'save')
      imageUrl: "https://scontent.fslp3-1.fna.fbcdn.net/v/t39.30808-6/492050109_1224589033013778_7783763610710267691_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=N3jtDH3OhBgQ7kNvwFL8x0c&_nc_oc=AdnZUOybbhRukBVeK-riYusun8gLtys4mrbJBcC12wSZdKPQ1EWNogXrG5DEC9jT1XXWenxBUszvglbPPA6k22qZ&_nc_zt=23&_nc_ht=scontent.fslp3-1.fna&_nc_gid=dwmhu4ZvxleC1mM6knf0Rg&oh=00_AfHlU8OBEm-MquiQEPGg5TWP6eTeA0slZ1tVn49yeoXfOQ&oe=68175739" // <-- CAMBIA ESTA RUTA
    },
    {
      title: "Gaming Peripherals",
      description: "Precision mice and mechanical keyboards",
      price: "$89.99",
      iconName: "mouse", // Icono Material
      imageUrl: "assets/images/product-peripherals.png" // <-- CAMBIA ESTA RUTA
    },
    {
      title: "Audio Equipment",
      description: "High-fidelity headphones and speakers",
      price: "$149.99",
      iconName: "headphones", // Icono Material
      imageUrl: "assets/images/product-audio.png" // <-- CAMBIA ESTA RUTA
    },
  ];
}