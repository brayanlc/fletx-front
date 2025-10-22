import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto, CreateProductoRequest, UpdateProductoRequest } from '../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss'
})
export class ProductoFormComponent implements OnInit {
  producto: CreateProductoRequest = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };
  isEdit: boolean = false;
  productoId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productoId = +id;
      this.loadProducto();
    }
  }

  loadProducto(): void {
    if (this.productoId) {
      this.isLoading = true;
      this.productoService.getById(this.productoId).subscribe({
        next: (producto) => {
          this.producto = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock
          };
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error cargando producto:', error);
          this.errorMessage = 'Error al cargar el producto';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEdit && this.productoId) {
      const updateData: UpdateProductoRequest = { ...this.producto };
      this.productoService.update(this.productoId, updateData).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error actualizando producto:', error);
          this.errorMessage = 'Error al actualizar el producto';
          this.isLoading = false;
        }
      });
    } else {
      this.productoService.create(this.producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creando producto:', error);
          this.errorMessage = 'Error al crear el producto';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/productos']);
  }
}
