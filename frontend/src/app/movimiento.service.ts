import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from './movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://localhost:8080/api/movimientos'; // Cambia esta URL según sea necesario

  constructor(private http: HttpClient) {}

  // Obtener todos los movimientos
  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  // Eliminar un movimiento
  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo movimiento
  addMovimiento(movimiento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movimiento);
  }
  // Aquí puedes agregar otros métodos como editar o agregar movimiento si es necesario
}
