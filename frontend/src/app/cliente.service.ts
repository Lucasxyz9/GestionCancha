import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './clientes.model'; // Importa tu modelo de Cliente

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 
  private apiUrl = 'http://localhost:8080/api/clientes'; // URL del backend

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
  actualizarCliente(cliente: Cliente) {
    return this.http.put(`http://localhost:8080/api/clientes/${cliente.idCliente}`, cliente);
  }
  
  
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Asegúrate de que la respuesta sea 'void'
  }

    // Método que retorna un Observable<Cliente[]>
    getClientes(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.apiUrl); // Este debe devolver un Observable de tipo Cliente[]
    }

    buscarCliente(ci?: string, ruc?: string): Observable<Cliente> {
      let url = `${this.apiUrl}/buscar?`;
      if (ci) {
        url += `ci=${ci}`;
      }
      if (ruc) {
        url += `ruc=${ruc}`;
      }
      return this.http.get<Cliente>(url);
    }

    buscarCliente2(ci?: string, ruc?: string): Observable<Cliente[]> {
      let url = `${this.apiUrl}/buscar?`;
      if (ci) {
        url += `ci=${ci}`;
      }
      if (ruc) {
        url += `ruc=${ruc}`;
      }
      return this.http.get<Cliente[]>(url); // <- Cambiado de clientes a clientes[]
    }
    
    buscarClientePorCI(ci: string): Observable<Cliente> {
      return this.http.get<Cliente>(`http://localhost:8080/api/clientes/buscar2?ci=${ci}`);
    }
  crearCliente(cliente: Cliente): Observable<Cliente> {
  return this.http.post<Cliente>('/api/clientes', cliente);
}

}
