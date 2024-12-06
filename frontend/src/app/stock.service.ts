  import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/api/stock';
  private baseUrl = 'http://localhost:8080/api/stock';
  
  constructor(private http: HttpClient) {}

  saveStock(stock: Stock): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, stock);
  }

  // Método para obtener todos los stocks desde el backend
  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl); // Hace la solicitud GET a la API
  }

   // Método para obtener el stock por producto y sucursal
   getStockByProductoAndSucursal(productoId: number, sucursalId: number): Observable<any> {
    // Llama a tu API backend con los parámetros productoId y sucursalId
    return this.http.get<any>(`${this.baseUrl}/search?productoId=${productoId}&sucursalId=${sucursalId}`);
  }

  saveStocks(stocks: Stock[]): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/many`, stocks, { observe: 'response' });
  }
  
}
