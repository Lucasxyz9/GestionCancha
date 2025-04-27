import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';
import { Cliente } from '../clientes.model';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss']
})
export class ReservaModalComponent implements OnInit {
  reserva: any = {};  // Datos de la reserva
  horaInicio: string = '';
  horaFin: string = '';
  ciBusqueda: string = '';
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  nombre: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    public dialogRef: MatDialogRef<ReservaModalComponent>,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.reserva = this.data?.reserva || {};

    if (this.reserva.horaInicio) {
      this.horaInicio = this.reserva.horaInicio;
    }
    if (this.reserva.horaFin) {
      this.horaFin = this.reserva.horaFin;
    }
  }

  // Método para guardar la reserva
  saveReserva(): void {
    this.reserva.horaInicio = this.horaInicio;
    this.reserva.horaFin = this.horaFin;
    
    if (this.clienteSeleccionado) {
      this.reserva.clienteId = this.clienteSeleccionado.idCliente; // Asignamos el idCliente seleccionado
    }

    console.log('Reserva guardada:', this.reserva);
    this.dialogRef.close(this.reserva);
  }

  // Método para cancelar
  cancel(): void {
    this.dialogRef.close();
  }

  buscarClientePorCI(): void {
    if (this.ciBusqueda.length >= 6) {
      this.clienteService.buscarClientePorCI(this.ciBusqueda).subscribe(
        (cliente: Cliente) => {
          if (cliente) {
            this.clientes = [cliente];  // Ponemos el cliente encontrado dentro de un array
          } else {
            this.clientes = [];
          }
        },
        (error) => console.error('Error al buscar cliente', error)
      );
    } else {
      this.clienteService.listarClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes;
        },
        (error) => console.error('Error al listar clientes', error)
      );
    }
  }
    
  // Seleccionar cliente de la lista
  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.nombre = cliente.nombre;
  }
}
