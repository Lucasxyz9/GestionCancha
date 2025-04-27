import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './clientes.model'; // Importa tu modelo de Cliente

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes'; // URL del backend
  private baseUrl = 'http://localhost:8080/api/clientes'; // ⚠️ Cambia si tu backend tiene otra ruta


  constructor(private http: HttpClient) {}

  // Método para guardar un cliente
  guardarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Método para obtener todos los clientes
  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Método para obtener un cliente por ID
  obtenerCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar un cliente
  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.idCliente}`, cliente);
  }

  // Método para eliminar un cliente
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscar(ci?: string, ruc?: string): Observable<Cliente> {
    let url = `${this.apiUrl}/buscar`;
    if (ci) {
      url += `ci=${ci}`;
    }
    if (ruc) {
      url += `ruc=${ruc}`;
    }
    return this.http.get<Cliente>(url);
  }

  buscar2(ci?: string, ruc?: string): Observable<Cliente> {
    let params = [];
    if (ci) params.push(`ci=${ci}`);
    if (ruc) params.push(`ruc=${ruc}`);
    const url = `${this.apiUrl}/buscar?${params.join('&')}`;
    return this.http.get<Cliente>(url);
  }
  

  buscarCliente(ciOrRuc: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/buscar?ci=${ciOrRuc}&ruc=${ciOrRuc}`);
  }
  
  // Método para buscar clientes por CI
  buscarCliente2(ci: string): Observable<Cliente[]> {
    const url = `${this.apiUrl}?ci=${ci}`;  // Asumiendo que tu API filtra por CI
    return this.http.get<Cliente[]>(url);
  }  

  buscarClientePorCI(ci: string): Observable<Cliente> {
    return this.http.get<Cliente>(`http://localhost:8080/api/clientes/buscar2?ci=${ci}`);
  }
  
}
  
  
