import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { ventas } from './ventas.model';
import { Cliente } from './clientes.model';

export interface RegistroVenta {
  idSucursal: number;
  cajaId: number;
  clienteId: number; // <-- mejor así, camelCase

  productos: {
    id_producto: number;
    cantidad: number;
  }[];
  total: number;
}



@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private baseUrl = 'http://localhost:8080/api/caja'; // Cambia al URL de tu backend si es diferente
  apiUrl: any;
  clienteService: any;

  constructor(private http: HttpClient) {}

registrarVenta(venta: RegistroVenta): Observable<{ status: string; message: string }> {
  return this.http.post<{ status: string; message: string }>(`${this.baseUrl}/registrarVenta`, venta);
}

  asociarClienteACaja(venta: ventas): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/asociar-cliente`, venta);
  }

  abrirCaja(sucursalId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/abrir`, { sucursalId });
}



}
