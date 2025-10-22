import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/productos']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMessage = error.error?.error || 'Error al iniciar sesión';
        this.isLoading = false;
      }
    });
  }
}
