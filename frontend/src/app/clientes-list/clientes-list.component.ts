import { Component, OnInit } from '@angular/core';
import { clientes } from './../clientes.model'; // Mantén la importación correcta
import { ClienteService } from './../cliente.service';
import Swal from 'sweetalert2';


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
  Swal.fire({
    title: "¿Está seguro de que desea eliminar el cliente?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Eliminar",
    denyButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.eliminarCliente(id).subscribe(
        () => {
          // Eliminamos el cliente de la lista localmente
          this.clientes = this.clientes.filter(cliente => cliente.idCliente !== id);
          Swal.fire("¡Eliminado!", "El cliente ha sido eliminado exitosamente.", "success");
        },
        (error) => {
          console.error('Error al eliminar el cliente', error);
          Swal.fire("Error", "No se pudo eliminar el cliente. Intente de nuevo más tarde.", "error");
        }
      );
    } else if (result.isDenied) {
      Swal.fire("Cancelado", "La operación fue cancelada.", "info");
    }
  });
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
