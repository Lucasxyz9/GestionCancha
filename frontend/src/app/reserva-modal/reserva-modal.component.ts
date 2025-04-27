import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';
import { SucursalService } from '../sucursales.service';
import { CanchaService } from '../cancha.service';
import { Cliente } from '../clientes.model';

interface Sucursal {
  id: number;
  idSucursal?: number; // Para compatibilidad con backend que usa idSucursal
  nombre: string;
  ubicacion?: string;
  timbrado?: string;
}

interface Cancha {
  id: number;
  nombre: string;
  idSucursal: number;
}

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss']
})
export class ReservaModalComponent implements OnInit {
  reserva: any = {};
  horaInicio: string = '';
  horaFin: string = '';
  ciBusqueda: string = '';
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  nombre: string = '';
  errorCargandoCanchas: boolean = false;
  sucursales: Sucursal[] = [];
  canchas: Cancha[] = [];
  selectedSucursal: Sucursal | null = null;
  selectedCancha: Cancha | null | undefined = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    public dialogRef: MatDialogRef<ReservaModalComponent>,
    private clienteService: ClienteService,
    private sucursalService: SucursalService,
    private canchaService: CanchaService
  ) {}

  ngOnInit(): void {
    this.loadSucursales();
    this.initializeFormData();
  }

  private initializeFormData(): void {
    this.reserva = this.data?.reserva || {};

    if (this.reserva.horaInicio) {
      this.horaInicio = this.reserva.horaInicio;
    }
    if (this.reserva.horaFin) {
      this.horaFin = this.reserva.horaFin;
    }
  }

  loadSucursales(): void {
    this.sucursalService.getSucursales().subscribe({
      next: (sucursales: any[]) => {
        // Normaliza las sucursales para usar id consistentemente
        this.sucursales = sucursales.map(s => ({
          id: s.id || s.idSucursal,
          nombre: s.nombre,
          ubicacion: s.ubicacion,
          timbrado: s.timbrado
        }));

        // Si estamos editando, seleccionar la sucursal existente
        if (this.reserva.sucursalId) {
          const sucursal = this.sucursales.find(s => s.id === this.reserva.sucursalId);
          if (sucursal) {
            this.selectedSucursal = sucursal;
            this.loadCanchas(sucursal.id);
          }
        }
      },
      error: (error) => {
        console.error('Error al cargar sucursales', error);
      }
    });
  }

  onSucursalChange(event: any): void {
    if (!event?.value) {
      this.resetSucursalSelection();
      return;
    }

    // Asegurarse de que tenemos un ID válido (ya normalizado en loadSucursales)
    if (!event.value.id) {
      console.warn('Sucursal sin ID válido', event.value);
      this.resetSucursalSelection();
      return;
    }

    this.selectedSucursal = event.value;
    this.selectedCancha = null;
    this.loadCanchas(event.value.id);
  }

  private resetSucursalSelection(): void {
    this.selectedSucursal = null;
    this.canchas = [];
    this.selectedCancha = null;
    this.reserva.canchaId = null;
  }

  loadCanchas(sucursalId: number): void {
    if (!sucursalId || isNaN(sucursalId)) {
      console.error('ID de sucursal no válido:', sucursalId);
      this.canchas = [];
      return;
    }

    this.errorCargandoCanchas = false;
    this.canchaService.getCanchasBySucursal(sucursalId).subscribe({
      next: (canchas: any[]) => {
        this.canchas = canchas || [];
        
        // Si estamos editando, seleccionar la cancha existente
        if (this.reserva?.canchaId) {
          this.selectedCancha = this.canchas.find(c => c.id === this.reserva.canchaId);
          if (this.selectedCancha) {
            this.reserva.canchaId = this.selectedCancha.id;
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar canchas:', err);
        this.errorCargandoCanchas = true;
        this.canchas = [];
        this.selectedCancha = null;
      }
    });
  }

  onCanchaChange(event: any): void {
    if (event.value) {
      this.selectedCancha = event.value;
      this.reserva.canchaId = event.value.id;
    } else {
      this.selectedCancha = null;
      this.reserva.canchaId = null;
    }
  }

  buscarClientePorCI(): void {
    if (this.ciBusqueda.length >= 6) {
      this.clienteService.buscarClientePorCI(this.ciBusqueda).subscribe({
        next: (cliente: Cliente) => {
          this.clientes = cliente ? [cliente] : [];
        },
        error: (error) => {
          console.error('Error al buscar cliente', error);
          this.clientes = [];
        }
      });
    } else {
      this.clienteService.listarClientes().subscribe({
        next: (clientes: Cliente[]) => {
          this.clientes = clientes;
        },
        error: (error) => {
          console.error('Error al listar clientes', error);
          this.clientes = [];
        }
      });
    }
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.nombre = cliente.nombre;
  }

  saveReserva(): void {
    // Validación básica
    if (!this.validateReserva()) {
      return;
    }

    // Preparar datos
    this.prepareReservaData();

    console.log('Reserva guardada:', this.reserva);
    this.dialogRef.close(this.reserva);
  }

  private validateReserva(): boolean {
    if (!this.selectedSucursal) {
      console.warn('Debe seleccionar una sucursal');
      return false;
    }
    if (!this.selectedCancha) {
      console.warn('Debe seleccionar una cancha');
      return false;
    }
    return true;
  }

  private prepareReservaData(): void {
    this.reserva = {
      ...this.reserva,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      sucursalId: this.selectedSucursal?.id,
      canchaId: this.selectedCancha?.id,
      clienteId: this.clienteSeleccionado?.idCliente
    };
  }

  cancel(): void {
    this.dialogRef.close();
  }
}