import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

export interface Service {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  __v?: number; 
}

export type ServiceCreationData = Omit<Service, '_id' | '__v'>;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

 
  getServiceById(id: string): Observable<{ result: Service }> {
    return this.http.get<{ result: Service }>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo servicio (ruta protegida para admins)
  createService(serviceData: ServiceCreationData): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, serviceData, { headers: this.getAuthHeaders() });
  }

  // Actualizar un servicio existente (ruta protegida para admins)
  updateService(id: string, serviceData: ServiceCreationData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, serviceData, { headers: this.getAuthHeaders() });
  }

  // Eliminar un servicio (ruta protegida para admins)
  deleteService(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}