import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';     // Para el icono
import { MatButtonModule } from '@angular/material/button';   // Para el botón "link"
import { Service } from '../services-section/services-section.component'; // Importa la interfaz

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,    // <-- Importa módulos necesarios
    MatButtonModule
  ],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service!: Service; // Recibe el objeto 'service' del padre
}