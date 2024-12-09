import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clientes } from './clientes.model'; // Importa tu modelo de Cliente

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para guardar un cliente
  guardarCliente(cliente: clientes): Observable<clientes> {
    return this.http.post<clientes>(this.apiUrl, cliente);
  }

  // Método para obtener todos los clientes
  listarClientes(): Observable<clientes[]> {
    return this.http.get<clientes[]>(this.apiUrl);
  }

  // Método para obtener un cliente por ID
  obtenerCliente(id: number): Observable<clientes> {
    return this.http.get<clientes>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar un cliente
  actualizarCliente(cliente: clientes): Observable<clientes> {
    return this.http.put<clientes>(`${this.apiUrl}/${cliente.id_cliente}`, cliente);
  }

  // Método para eliminar un cliente
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}