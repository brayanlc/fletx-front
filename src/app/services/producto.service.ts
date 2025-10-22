import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, CreateProductoRequest, UpdateProductoRequest } from '../models/producto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(producto: CreateProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto, { headers: this.getHeaders() });
  }

  update(id: number, producto: UpdateProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
