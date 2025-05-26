import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // RouterModule para routerLink en la plantilla
import { CommonModule, TitleCasePipe } from '@angular/common'; // TitleCasePipe para el rol
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta si es necesario

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-perfil', // Asegúrate que el selector sea el correcto (usualmente app-nombre-componente)
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    TitleCasePipe // Para formatear el rol
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  username: string | null = null;
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router // Inyectamos Router por si lo necesitamos, aunque logout() en AuthService ya navega
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.userRole = this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
    // El método logout() del AuthService ya se encarga de redirigir a /login.
    // Si quisieras una redirección diferente desde aquí, podrías añadir:
    // this.router.navigate(['/alguna-otra-ruta']);
  }
}