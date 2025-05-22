import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: 'cart',
  //   component: CartComponent
  // },
  

  // Ejemplo:
  // { path: 'products', component: ProductListPageComponent },
  // { path: 'products/:id', component: ProductDetailPageComponent },

  {
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  }
];