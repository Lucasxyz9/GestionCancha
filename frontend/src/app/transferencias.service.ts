import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  private baseUrl = 'http://localhost:8080/transferencias';

  constructor(private http: HttpClient) {}

  registrarTransferencia(transferencia: any): Observable<any> {
    return this.http.post(this.baseUrl, transferencia);
  }
}
