export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export interface CreateProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export interface UpdateProductoRequest {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
}
