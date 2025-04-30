import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; // Módulo para <mat-toolbar>
import { MatIconModule } from '@angular/material/icon';     // Módulo para <mat-icon>

@Component({
  selector: 'app-footer',
  standalone: true, // <-- Standalone
  imports: [
    CommonModule,
    MatToolbarModule, // <-- Módulos necesarios
    MatIconModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Propiedad para obtener el año actual dinámicamente
  currentYear: number = new Date().getFullYear();
}