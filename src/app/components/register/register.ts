import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData: RegisterRequest = {
    email: '',
    password: '',
    nombre: ''
  };
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.isLoading = false;
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/productos']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.errorMessage = error.error?.error || 'Error al registrarse';
        this.isLoading = false;
      }
    });
  }
}
