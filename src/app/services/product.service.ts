import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

 
  getProductById(id: string): Observable<{ result: Product }> { 
    return this.http.get<{ result: Product }>(`${this.apiUrl}/${id}`);
  }

  createProduct(productData: ProductCreationData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  updateProduct(id: string, productData: ProductCreationData): Observable<any> { 
    return this.http.put<any>(`${this.apiUrl}/${id}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}