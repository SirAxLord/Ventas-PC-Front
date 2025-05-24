import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { CreateServiceComponent } from './pages/create-service/create-service.component';
import { EditServiceComponent } from './pages/edit-service/edit-service.component';

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
  {
    path: 'admin/productos/crear',
    component: CrearProductoComponent 
  },
   {
    path: 'admin/productos/editar/:id', 
    component: EditarProductoComponent
  },
  {
    path: 'carrito', 
    component: CartComponent
  },
  {
    path: 'producto/:id', 
    component: ProductDetailComponent
  },
  {
    path: 'servicio/:id', 
    component: ServiceDetailComponent
  },
  {
    path: 'admin/servicios/crear',
    component: CreateServiceComponent
  },
{
    path: 'admin/servicios/editar/:id', 
    component: EditServiceComponent
  },

  {
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  }
];