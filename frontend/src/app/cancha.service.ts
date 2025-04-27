import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cancha } from './cancha.model';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private apiUrl = 'http://localhost:8080/api/canchas'; // Asegúrate que sea correcto
  constructor(private http: HttpClient) { }

  // Configuración común de headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Manejo centralizado de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en el servicio Cancha:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.'));
  }

  // Obtener canchas por sucursal (versión unificada)
  getCanchasBySucursal(sucursalId: number): Observable<Cancha[]> {
    if (!sucursalId) {
      return throwError(() => new Error('ID de sucursal no proporcionado'));
    }
    // Elimina la duplicación de '/canchas' en la URL
    return this.http.get<Cancha[]>(`${this.apiUrl}/sucursal/${sucursalId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las canchas
  getAllCanchas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener estados de canchas
  getEstadosCancha(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados`).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una cancha
  deleteCancha(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una nueva cancha
  createCancha(cancha: Cancha): Observable<Cancha> {
    if (!this.validateCancha(cancha)) {
      return throwError(() => new Error('Datos incompletos para crear cancha'));
    }

    return this.http.post<Cancha>(this.apiUrl, cancha, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una cancha
  updateCancha(cancha: Cancha): Observable<Cancha> {
    if (!cancha.idCancha || !this.validateCancha(cancha)) {
      return throwError(() => new Error('Datos incompletos para actualizar cancha'));
    }

    return this.http.put<Cancha>(`${this.apiUrl}/${cancha.idCancha}`, cancha, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener cancha por ID
  getCanchaById(id: number): Observable<Cancha> {
    if (!id) {
      return throwError(() => new Error('ID de cancha no proporcionado'));
    }
    
    return this.http.get<Cancha>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Buscar canchas por nombre
  searchCanchas(nombre: string): Observable<Cancha[]> {
    if (!nombre || nombre.trim().length < 2) {
      return throwError(() => new Error('El término de búsqueda debe tener al menos 2 caracteres'));
    }
    
    return this.http.get<Cancha[]>(`${this.apiUrl}/search?nombre=${encodeURIComponent(nombre)}`).pipe(
      catchError(this.handleError)
    );
  }

  // Validación común para cancha
  private validateCancha(cancha: Cancha): boolean {
    return !!cancha.nombre && 
           !!cancha.ubicacion && 
           !!cancha.estado && 
           (!!cancha.sucursal?.idSucursal || !!cancha.idSucursal);
  }
}