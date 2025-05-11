import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva } from './reserva.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaSubject = new BehaviorSubject<Reserva | null>(null);
  reserva$ = this.reservaSubject.asObservable();

  setReserva(reserva: Reserva) {
    this.reservaSubject.next(reserva);
  }
  
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      catchError(this.handleError<Reserva[]>('getReservas', []))
    );
  }

  getReserva(idReserva: string): Observable<Reserva> {
    if (!idReserva) {
      return throwError(() => new Error('ID de reserva es requerido'));
    }
    
    const url = `${this.apiUrl}/${idReserva}`;
    return this.http.get<Reserva>(url).pipe(
      catchError(this.handleError<Reserva>(`getReserva idReserva=${idReserva}`))
    );
  }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    // Validaciones completas
    if (!reserva) {
      return throwError(() => new Error('El objeto reserva es requerido'));
    }

    if (!reserva.cancha?.idCancha) {
      return throwError(() => new Error('El ID de la cancha es requerido'));
    }
    
    if (!reserva.cliente?.idCliente) {
      return throwError(() => new Error('El ID del cliente es requerido'));
    }

    if (!reserva.usuario?.idUsuario) {
      return throwError(() => new Error('El ID del usuario es requerido'));
    }

    if (!reserva.empresa?.idEmpresa) {
      return throwError(() => new Error('El ID de la empresa es requerido'));
    }

    if (!reserva.fecha || !reserva.horaInicio || !reserva.horaFin) {
      return throwError(() => new Error('Fecha y horarios son requeridos'));
    }

    const reservaBody = {
      fecha: reserva.fecha,
      horaInicio: reserva.horaInicio,
      horaFin: reserva.horaFin,
      cancha: { idCancha: reserva.cancha.idCancha },
      cliente: { idCliente: reserva.cliente.idCliente },
      usuario: { idUsuario: reserva.usuario.idUsuario },
      empresa: { idEmpresa: reserva.empresa.idEmpresa }
    };

    return this.http.post<Reserva>(this.apiUrl, reservaBody).pipe(
      catchError(error => {
        console.error('Error en crearReserva:', error);
        return throwError(() => new Error(error.error?.message || 'Error al crear la reserva'));
      })
    );
  }

  updateReserva(reserva: Reserva): Observable<Reserva> {
    if (!reserva?.idReserva) {
      return throwError(() => new Error('ID de reserva es requerido para actualización'));
    }

    const body = {
      fecha: reserva.fecha,
      horaInicio: reserva.horaInicio,
      horaFin: reserva.horaFin,
      cancha: { idCancha: reserva.cancha?.idCancha },
      cliente: { idCliente: reserva.cliente?.idCliente },
      usuario: { idUsuario: reserva.usuario?.idUsuario },
      empresa: { idEmpresa: reserva.empresa?.idEmpresa }
    };

    return this.http.put<Reserva>(`${this.apiUrl}/${reserva.idReserva}`, body).pipe(
      catchError(this.handleError<Reserva>('updateReserva'))
    );
  }

  deleteReserva(idReserva: string): Observable<any> {
    if (!idReserva) {
      return throwError(() => new Error('ID de reserva es requerido'));
    }

    const url = `${this.apiUrl}/${idReserva}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deleteReserva'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('Error completo:', error);
      return throwError(() => error);
    };
  }
  getDisponibilidad(fecha: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/disponibilidad?fecha=${fecha}`);
  }

   createReserva(reserva: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas`, reserva);
  }

  
}