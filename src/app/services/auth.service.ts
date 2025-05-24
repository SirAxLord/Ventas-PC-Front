// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 👈 IMPORTANTE: Asegúrate de tener HttpClientModule o provideHttpClient configurado
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export interface AuthResponse { // Interfaz para la respuesta del login
  token: string;
  msg: string;
  username?: string; // Opcional, si tu backend lo devuelve
  role?: string;     // Opcional, si tu backend lo devuelve
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private backendApiUrl = 'http://localhost:8080/api/auth'; // Ajusta si tu URL base es diferente

  constructor(
    private router: Router,
    private http: HttpClient // 👈 Inyecta HttpClient
  ) { }

  // --- Métodos para llamadas HTTP ---
  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.backendApiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token);
        }
      })
    );
  }

  register(userInfo: any): Observable<any> { // Define una interfaz para la respuesta si es necesario
    return this.http.post<any>(`${this.backendApiUrl}/register`, userInfo);
  }

  // --- Métodos de manejo de Token y estado ---
  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<DecodedToken>(token);
      } catch (error) {
        console.error("Error decodificando el token:", error);
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp * 1000 > Date.now();
    }
    return false;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }

  getUsername(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.username : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}