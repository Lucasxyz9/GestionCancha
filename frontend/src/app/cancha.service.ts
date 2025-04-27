import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancha } from './cancha.model';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private apiUrl = 'http://localhost:8080/api/canchas'; // Cambiar según tu URL de API

  constructor(private http: HttpClient) { }

  // Obtener las canchas por sucursal
  obtenerCanchasPorSucursal(idSucursal: number): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/sucursal/${idSucursal}`);
  }

  // Obtener todas las canchas
  obtenerTodasLasCanchas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(this.apiUrl);
  }

  // Obtener los estados de las canchas
  getEstadoCanchas(): Observable<any[]> {
    return this.http.get<any[]>('/api/canchas/estado');
  }

  // Eliminar una cancha por id
  eliminarCancha(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva cancha
// Crear una nueva cancha
crearCancha(cancha: Cancha): Observable<Cancha> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  console.log('Datos de la cancha antes de enviar:', cancha); // Verifica qué datos se están enviando

  // Validar si los campos esenciales están presentes antes de enviar la petición
  if (
    !cancha.nombre ||
    !cancha.ubicacion ||
    !cancha.estado ||
    !cancha.sucursal ||
    !cancha.sucursal.idSucursal
  ) {
    throw new Error('Faltan campos requeridos para crear la cancha.');
  }

  return this.http.post<Cancha>(this.apiUrl, cancha, { headers });
}


  // Actualizar una cancha
  actualizarCancha(cancha: Cancha): Observable<Cancha> {
    console.log('Datos de la cancha antes de enviar:', cancha); // Verifica los datos

    // Validar si los campos esenciales están presentes antes de enviar la petición
    if (!cancha.idCancha || !cancha.nombre || !cancha.ubicacion || !cancha.estado || !cancha.idSucursal) {
      throw new Error('Faltan campos requeridos para actualizar la cancha.');
    }

    return this.http.put<Cancha>(`${this.apiUrl}/${cancha.idCancha}`, cancha);
  }

  // Obtener una cancha por id
  obtenerCanchaPorId(idCancha: number): Observable<Cancha> {
    return this.http.get<Cancha>(`${this.apiUrl}/${idCancha}`);
  }

  buscarCanchas(nombre: string): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
  }
    // Método para obtener las canchas por sucursal
    getCanchasBySucursal(sucursalId: number) {
      return this.http.get<any[]>(`api/canchas/sucursal/${sucursalId}`);
    }
}
