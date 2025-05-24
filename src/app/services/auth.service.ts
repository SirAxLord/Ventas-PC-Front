import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export interface AuthResponse {
  token: string;
  msg: string;
  username?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private backendApiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.backendApiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token);
        }
      })
    );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.backendApiUrl}/register`, userInfo);
  }

  private storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
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

    if (isPlatformBrowser(this.platformId)) {
        const decodedToken = this.getDecodedToken();
        if (decodedToken && decodedToken.exp) {
            return decodedToken.exp * 1000 > Date.now();
        }
    }
    return false;
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
        const decodedToken = this.getDecodedToken();
        return decodedToken ? decodedToken.role : null;
    }
    return null;
  }

  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
        const decodedToken = this.getDecodedToken();
        return decodedToken ? decodedToken.username : null;
    }
    return null;
  }

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
        return this.getUserRole() === 'admin';
    }
    return false;
  }
}