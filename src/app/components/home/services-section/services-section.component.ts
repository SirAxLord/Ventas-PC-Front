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
      title: "Custom PC Builds",
      description: "Tailored gaming or workstation PCs built to your specifications",
      iconName: "build", // Icono Material
    },
    {
      title: "Hardware Upgrades",
      description: "Boost your system's performance with the latest components",
      iconName: "upgrade", // Icono Material
    },
    {
      title: "Virus Removal",
      description: "Clean and secure your device from malware and viruses",
      iconName: "security", // Icono Material (o 'bug_report')
    },
    {
      title: "Data Recovery",
      description: "Retrieve your important files from damaged storage devices",
      iconName: "settings_backup_restore", // Icono Material
    },
    {
      title: "Network Setup",
      description: "Configure your home or office network for optimal performance",
      iconName: "router", // Icono Material (o 'lan')
    },
    {
      title: "Tech Consultation",
      description: "Expert advice on the best solutions for your tech needs",
      iconName: "support_agent", // Icono Material (o 'help_outline')
    },
  ];
}