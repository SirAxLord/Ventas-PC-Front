import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink 
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false; // Cambia esto a true para probar la vista de "Mi Cuenta"

  constructor() { } // Puedes inyectar AuthService y Router aquí más adelante

  logout(): void {
    console.log('Cerrar Sesión clickeado');
    // Aquí, en el futuro, llamarías a this.authService.logout()
    // y probablemente redirigirías: this.router.navigate(['/login']);
    this.isLoggedIn = false; // Para simular el cambio de estado visualmente
  }
}