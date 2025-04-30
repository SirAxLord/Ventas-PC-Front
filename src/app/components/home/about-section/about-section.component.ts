import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Para el botón

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule // Importa el módulo del botón
  ],
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent {
  // No necesita lógica especial ni datos por ahora
}