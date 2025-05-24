import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router'; // Importa Router
import { AuthService } from '../../../services/auth.service'; 

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

  // Ya no usamos una variable local 'isLoggedIn', usamos el servicio
  // isLoggedIn = false;

  // Inyecta AuthService y Router
  constructor(public authService: AuthService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    console.log('Cerrar Sesión clickeado');
    this.authService.logout();
    // La navegación ya la hace el authService.logout()
    // this.router.navigate(['/login']);
  }
}