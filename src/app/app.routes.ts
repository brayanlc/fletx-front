import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent),
    canActivate: [GuestGuard]
  },
  { 
    path: 'productos', 
    loadComponent: () => import('./components/productos/productos').then(m => m.ProductosComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'productos/nuevo', 
    loadComponent: () => import('./components/producto-form/producto-form').then(m => m.ProductoFormComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'productos/editar/:id', 
    loadComponent: () => import('./components/producto-form/producto-form').then(m => m.ProductoFormComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
