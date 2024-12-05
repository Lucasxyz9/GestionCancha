import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistroVenta {
  idSucursal: number;
  cajaId: number; // Agregar esta propiedad
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

  constructor(private http: HttpClient) {}

  registrarVenta(venta: RegistroVenta): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/registrarVenta`, venta);
  }
}
