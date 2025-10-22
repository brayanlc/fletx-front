import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  currentUser: any = null;

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productoService.getAll().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.errorMessage = 'Error al cargar los productos';
        this.isLoading = false;
      }
    });
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.delete(id).subscribe({
        next: () => {
          this.loadProductos(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error eliminando producto:', error);
          this.errorMessage = 'Error al eliminar el producto';
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
