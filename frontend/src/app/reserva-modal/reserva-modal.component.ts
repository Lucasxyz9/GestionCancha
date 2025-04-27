import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';
import { SucursalService } from '../sucursales.service';
import { CanchaService } from '../cancha.service';

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

  sucursales: any[] = [];  // Lista de sucursales
  canchas: any[] = [];  // Lista de canchas
  selectedSucursal: any = null;  // Sucursal seleccionada
  selectedCancha: any = null;  // Cancha seleccionada

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    public dialogRef: MatDialogRef<ReservaModalComponent>,
    private clienteService: ClienteService,
    private sucursalService: SucursalService,  // Inyectamos el servicio de sucursales
    private canchaService: CanchaService  // Inyectamos el servicio de canchas
  ) {}

  ngOnInit(): void {
    this.reserva = this.data?.reserva || {};

    if (this.reserva.horaInicio) {
      this.horaInicio = this.reserva.horaInicio;
    }
    if (this.reserva.horaFin) {
      this.horaFin = this.reserva.horaFin;
    }

    this.loadSucursales();  // Cargar sucursales al iniciar el componente
  }

  // Cargar sucursales al iniciar el componente
  loadSucursales() {
    this.sucursalService.getSucursales().subscribe(
      (sucursales) => {
        this.sucursales = sucursales;
      },
      (error) => {
        console.error('Error al cargar las sucursales', error);
      }
    );
  }

  // Al cambiar la sucursal, cargar las canchas correspondientes
  onSucursalChange(event: any) {
    const sucursalId = event.value;
    if (sucursalId) {
      this.loadCanchas(sucursalId);
    }
  }

  // Cargar canchas según la sucursal seleccionada
  loadCanchas(sucursalId: number) {
    this.canchaService.getCanchasBySucursal(sucursalId).subscribe(
      (canchas: any[]) => {
        this.canchas = canchas;
      },
      (error: any) => {
        console.error('Error al cargar las canchas', error);
      }
    );
  }

  // Método para guardar la reserva
  saveReserva(): void {
    this.reserva.horaInicio = this.horaInicio;
    this.reserva.horaFin = this.horaFin;
    
    if (this.clienteSeleccionado) {
      this.reserva.clienteId = this.clienteSeleccionado.idCliente; // Asignamos el idCliente seleccionado
    }

    if (this.selectedCancha) {
      this.reserva.canchaId = this.selectedCancha.id;  // Asignamos el id de la cancha seleccionada
    }

    console.log('Reserva guardada:', this.reserva);
    this.dialogRef.close(this.reserva);
  }

  // Método para cancelar
  cancel(): void {
    this.dialogRef.close();
  }

  // Buscar cliente por CI
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
