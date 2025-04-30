import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa TODOS los componentes de sección que mostrarás
import { HeroSectionComponent } from '../../components/home/hero-section/hero-section.component';
import { ProductsSectionComponent } from '../../components/home/products-section/products-section.component';
import { ServicesSectionComponent } from '../../components/home/services-section/services-section.component';
import { AboutSectionComponent } from '../../components/home/about-section/about-section.component';
import { ContactSectionComponent } from '../../components/home/contact-section/contact-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    // Añade TODOS los componentes de sección aquí
    HeroSectionComponent,
    ProductsSectionComponent,
    ServicesSectionComponent,
    AboutSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent { }