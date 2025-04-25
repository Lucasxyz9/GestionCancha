import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';  // Importa el servicio de cliente
import { clientes } from '../clientes.model';  // Importa correctamente el modelo clientes

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss']
})
export class ReservaModalComponent implements OnInit {
  reserva: any = {};
  horaInicio: string = '';
  horaFin: string = '';
  ciORuc: string = '';  // CI o RUC ingresado por el usuario
  clientes: clientes[] = [];  // Lista de clientes encontrados
  clienteSeleccionado: clientes | null = null;  // Cliente seleccionado
  nombre: string = '';  // Nombre del cliente seleccionado

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    public dialogRef: MatDialogRef<ReservaModalComponent>,
    private clienteService: ClienteService  // Asegúrate de inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.reserva = this.data?.reserva || {};  // Inicializa reserva desde los datos del modal
    
    // Inicializar las horas si existen en la reserva
    if (this.reserva.horaInicio) {
      this.horaInicio = this.reserva.horaInicio;
    }
    
    if (this.reserva.horaFin) {
      this.horaFin = this.reserva.horaFin;
    }
  }

  // Método para guardar la reserva
  saveReserva(): void {
    // Asignar las horas seleccionadas al objeto reserva antes de guardarla
    this.reserva.horaInicio = this.horaInicio;
    this.reserva.horaFin = this.horaFin;
    
    console.log('Reserva guardada:', this.reserva);
    this.dialogRef.close(this.reserva);  // Cierra el modal y pasa la reserva
  }

  // Método para cancelar el modal
  cancel(): void {
    this.dialogRef.close();  // Cierra el modal sin pasar datos
  }

  // Método para buscar clientes por CI o RUC
  buscarClientes(): void {
    if (this.ciORuc.trim() !== '') {
      this.clienteService.buscarCliente(this.ciORuc).subscribe(
        (cliente: clientes) => {
          this.clientes = cliente ? [cliente] : [];  // Convertimos el objeto en array
        },
        (error) => {
          console.error('Error al buscar clientes', error);
          this.clientes = [];
        }
      );      

    } else {
      this.clientes = [];  // Limpiar la lista si no hay texto en el input
    }
  }

  // Método para seleccionar un cliente de la lista
  seleccionarCliente(cliente: clientes): void {
    this.clienteSeleccionado = cliente;  // Establecer cliente seleccionado
    this.nombre = cliente.nombre;  // Asignar el nombre del cliente
    this.ciORuc = cliente.ci;  // Asignar el CI o RUC del cliente
    this.clientes = [];  // Limpiar la lista de clientes
  }
}
