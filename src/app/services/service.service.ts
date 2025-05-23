import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';               

export interface Service {
  _id: string; 
  title: string;
  description: string;
  iconName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { } 

  getServices(): Observable<Service[]> { 
    return this.http.get<Service[]>(this.apiUrl);
  }

  // getServiceById(id: string): Observable<Service> { /* ... */ }
  // createService(serviceData: Omit<Service, '_id'>): Observable<Service> { /* ... */ }
  // etc.
}