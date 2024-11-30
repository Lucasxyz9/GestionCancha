import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/api/stock';
  
  constructor(private http: HttpClient) {}

  saveStock(stock: Stock): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, stock);
  }
  
}
