import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) { }

  getAvailability(date: Date): Observable<any> {
    const params = {
      fecha: date.toISOString().split('T')[0]
    };
    return this.http.get(this.apiUrl, { params });

  }
}