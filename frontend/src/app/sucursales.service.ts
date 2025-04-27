import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoSucursal, Sucursal } from './sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private baseUrl = 'http://localhost:8080/api/sucursales';  // URL de la API
  private apiUrl = 'http://localhost:8080/api/sucursales';


  constructor(private http: HttpClient) { }

  // Método para obtener todas las sucursales
  getSucursales(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Método para obtener una sucursal por ID
  getSucursal(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear una nueva sucursal
  createSucursal(sucursal: any): Observable<any> {
    return this.http.post(this.baseUrl, sucursal);
  }

  // Método para actualizar una sucursal existente
  updateSucursal(id: number, sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this.apiUrl}/${id}`, sucursal);
  }
  // Método para eliminar una sucursal
  deleteSucursal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  listarSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.apiUrl);
  }
}
