import { Component, OnInit } from '@angular/core';
import { clientes } from './../clientes.model'; // Mantén la importación correcta
import { ClienteService } from './../cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: clientes[] = [];
  clienteEdicion: clientes | null = null;
  ciBusqueda: string = ''; 

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    // Usamos 'listarClientes' para obtener todos los clientes
    this.clienteService.listarClientes().subscribe(
      (clientes) => this.clientes = clientes,
      (error) => console.error('Error al cargar clientes', error)
    );
  }

  editarCliente(cliente: clientes): void {
    // Hacemos una copia del cliente a editar
    this.clienteEdicion = { ...cliente };
  }

  actualizarCliente(): void {
    if (this.clienteEdicion && this.clienteEdicion.idCliente) { // Cambiar id_cliente a idCliente
      console.log('Cliente a actualizar:', this.clienteEdicion); // Verifica el contenido de clienteEdicion
      this.clienteService.actualizarCliente(this.clienteEdicion).subscribe(
        (cliente) => {
          this.cargarClientes();  // Volvemos a cargar la lista de clientes
          this.clienteEdicion = null;  // Limpiamos el objeto de edición
        },
        (error) => {
          console.error('Error al actualizar cliente', error);
        }
      );
    } else {
      console.error('El ID del cliente no está definido o el cliente está vacío', this.clienteEdicion);
    }
  }
  

  
  // Método para obtener la lista de clientes
  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes: clientes[]) => {
        this.clientes = clientes;
      },
      (error: any) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

 // Método para eliminar un cliente
eliminarCliente(id: number): void {
  this.clienteService.eliminarCliente(id).subscribe(
    () => {
      // Si la eliminación es exitosa, actualizamos la lista localmente
      this.clientes = this.clientes.filter(cliente => cliente.idCliente !== id);
    },
    (error) => {
      console.error('Error al eliminar el cliente', error);
    }
  );
}


  cancelarEdicion(): void {
    // Cancelamos la edición y limpiamos el objeto
    this.clienteEdicion = null;
  }


  buscarClientePorCI(): void {
    // Si el campo de búsqueda está vacío, recargamos todos los clientes
    if (!this.ciBusqueda) {
      this.cargarClientes();
    } else {
      // Filtramos los clientes que coincidan con el CI ingresado
      this.clientes = this.clientes.filter(cliente =>
        cliente.ci.includes(this.ciBusqueda)
      );
    }
  }
}
