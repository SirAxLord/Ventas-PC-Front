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

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; 
  constructor(private http: HttpClient) { } 

  getProducts(): Observable<any[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // getProductById(id: string): Observable<any> { /* ... */ }
  // createProduct(productData: any): Observable<any> { /* ... */ }
  // updateProduct(id: string, productData: any): Observable<any> { /* ... */ }
  // deleteProduct(id: string): Observable<any> { /* ... */ }
}