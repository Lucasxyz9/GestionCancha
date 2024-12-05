import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/productos';
  private apiUrlProducto = 'http://localhost:8080/productos/sucursal/';

  constructor(private http: HttpClient) { }

  createProducto(producto: Producto) {
    return this.http.post<Producto>(this.apiUrl, producto, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método para obtener un producto por su ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Método para eliminar producto
  deleteProducto(id: number): Observable<string> {  // Esperamos que el servidor devuelva texto
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      responseType: 'text' // Le decimos a Angular que espere texto plano
    });
  }
  

  updateProducto(id_producto: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`http://localhost:8080/productos/${id_producto}`, producto);
  }
  
  searchProducts(query: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?search=${query}`);
  }

  // Obtener productos por sucursal
  getProductosPorSucursal(sucursalId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrlProducto}${sucursalId}`);
  }
}


