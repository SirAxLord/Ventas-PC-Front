import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  iconName: string;
  image: string;
}

export type ProductCreationData = Omit<Product, '_id'>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<{ result: Product }> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();

    // ---- DEBUGGING ----
    console.log('ProductService - getToken() al ver detalles:', token); 

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // ---- DEBUGGING ----
    console.log('ProductService - Headers que se enviarán:', headers.get('Authorization'));

    return this.http.get<{ result: Product }>(`${this.apiUrl}/${id}`, { headers: headers });
  }

  createProduct(productData: ProductCreationData): Observable<Product> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<Product>(this.apiUrl, productData, { headers: headers });
  }

  updateProduct(id: string, productData: ProductCreationData): Observable<any> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, productData, { headers: headers });
  }

  deleteProduct(id: string): Observable<any> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: headers });
  }
}