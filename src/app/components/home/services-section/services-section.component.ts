import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../services/service.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCardComponent
  ],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent implements OnInit {

  services: Service[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(
      (data: Service[]) => {
        this.services = data;
        console.log('Servicios cargados:', this.services);
      },
      (error) => {
        console.error('Error al cargar los servicios:', error);
      }
    );
  }
}