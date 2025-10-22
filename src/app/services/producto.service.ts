import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, CreateProductoRequest, UpdateProductoRequest } from '../models/producto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/productos';

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  create(producto: CreateProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  update(id: number, producto: UpdateProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  delete(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }
}
