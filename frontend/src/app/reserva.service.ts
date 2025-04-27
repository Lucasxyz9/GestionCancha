import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva } from './reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reservas'; // Ajusta según tu API

  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      catchError(this.handleError<Reserva[]>('getReservas', []))
    );
  }

  getReserva(idReserva: string): Observable<Reserva> {
    const url = `${this.apiUrl}/${idReserva}`;
    return this.http.get<Reserva>(url).pipe(
      catchError(this.handleError<Reserva>(`getReserva idReserva=${idReserva}`))
    );
  }

  createReserva(reserva: Reserva): Observable<Reserva> {
    const body = {
      fecha: reserva.fecha,
      horaInicio: reserva.horaInicio,
      horaFin: reserva.horaFin,
      cancha: {
        idCancha: reserva.cancha.idCancha
      },
      cliente: {
        idCliente: reserva.cliente.idCliente
      },
      usuario: {
        idUsuario: reserva.usuario.idUsuario
      },
      empresa: {
        idEmpresa: reserva.empresa.idEmpresa
      }
    };
    return this.http.post<Reserva>(this.apiUrl, body);
  }

  // Método para actualizar una reserva existente
  updateReserva(reserva: Reserva): Observable<Reserva> {
    const body = {
      fecha: reserva.fecha,
      horaInicio: reserva.horaInicio,
      horaFin: reserva.horaFin,
      cancha: {
        idCancha: reserva.cancha.idCancha
      },
      cliente: {
        idCliente: reserva.cliente.idCliente
      },
      usuario: {
        idUsuario: reserva.usuario.idUsuario
      },
      empresa: {
        idEmpresa: reserva.empresa.idEmpresa
      }
    };
    return this.http.put<Reserva>(`${this.apiUrl}/${reserva.idReserva}`, body);
  }

  deleteReserva(idReserva: string): Observable<any> {
    const url = `${this.apiUrl}/${idReserva}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deleteReserva'))
    );
  }

  // Método para manejar errores de HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Devuelve un resultado vacío para que la aplicación siga funcionando
      return of(result as T);
    };
  }
}