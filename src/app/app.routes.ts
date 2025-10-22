import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProductosComponent } from './components/productos/productos';
import { ProductoFormComponent } from './components/producto-form/producto-form';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent },
  { path: '**', redirectTo: '/login' }
];
