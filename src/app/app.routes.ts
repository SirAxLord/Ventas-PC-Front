import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'; // Asegúrate que la ruta sea correcta

export const routes: Routes = [
  {
    path: '', 
    component: HomePageComponent // Carga este componente
  }
  
];