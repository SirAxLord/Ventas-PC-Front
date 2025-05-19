import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../service-card/service-card.component'; // Importa el componente hijo

// Interfaz opcional para la estructura del servicio
export interface Service {
  title: string;
  description: string;
  iconName: string; // Aunque en el original era siempre 'Monitor', lo hacemos flexible
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCardComponent // Importa el componente hijo para usarlo en *ngFor
  ],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent {
  // Array con los datos de los servicios
  services: Service[] = [
    {
      title: "Armado de PC Personalizado",
      description: "PCs de gaming o estaciones de trabajo adaptadas a tus especificaciones",
      iconName: "build", // Icono Material
    },
    {
      title: "Actualización de Hardware",
      description: "Mejora el rendimiento de tu sistema con los componentes más recientes",
      iconName: "upgrade", // Icono Material
    },
    {
      title: "Eliminación de Virus",
      description: "Limpia y protege tu dispositivo contra malware y virus",
      iconName: "security", // Icono Material (o 'bug_report')
    },
    {
      title: "Recuperación de Datos",
      description: "Recupera tus archivos importantes desde dispositivos de almacenamiento dañados",
      iconName: "settings_backup_restore", // Icono Material
    },
    {
      title: "Configuración de Red",
      description: "Optimiza la configuración de tu red doméstica o de oficina para un mejor rendimiento",
      iconName: "router", // Icono Material (o 'lan')
    },
    {
      title: "Consultoría Tecnológica",
      description: "Asesoramiento experto sobre las mejores soluciones para tus necesidades tecnológicas",
      iconName: "support_agent", // Icono Material (o 'help_outline')
    },
  ];
}
