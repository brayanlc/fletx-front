import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);


  canActivate(): boolean {
    if (this.authService.getToken()) {
      this.router.navigate(['/productos']);
      return false;
    } else {
      return true;
    }
  }
}
