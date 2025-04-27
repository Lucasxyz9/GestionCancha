import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';
import { SucursalService } from '../sucursales.service';
import { CanchaService } from '../cancha.service';
import { Cliente } from '../clientes.model';
import { ReservaService } from '../reserva.service';
import { AuthService } from '../auth.service';

interface Sucursal {
  id: number;
  idSucursal?: number;
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
  selectedCancha: Cancha | null = null;
  currentUserId: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    public dialogRef: MatDialogRef<ReservaModalComponent>,
    private clienteService: ClienteService,
    private sucursalService: SucursalService,
    private canchaService: CanchaService,
    private authService: AuthService,
    private reservaService: ReservaService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
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

    if (this.data?.reserva) {
      this.reserva.idEmpresa = this.reserva.idEmpresa || 1;
      this.reserva.idUsuario = this.reserva.idUsuario || this.currentUserId;
    }
  }

  loadSucursales(): void {
    this.sucursalService.getSucursales().subscribe({
      next: (sucursales: any[]) => {
        this.sucursales = sucursales.map(s => ({
          id: s.id || s.idSucursal,
          nombre: s.nombre,
          ubicacion: s.ubicacion,
          timbrado: s.timbrado
        }));

        if (this.reserva.sucursalId) {
          const sucursal = this.sucursales.find(s => s.id === this.reserva.sucursalId);
          if (sucursal) {
            this.selectedSucursal = sucursal;
            this.loadCanchas(sucursal.id);
          }
        }
      },
      error: (error) => console.error('Error al cargar sucursales', error)
    });
  }

  onSucursalChange(event: any): void {
    if (!event?.value?.id) {
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

        if (this.reserva?.canchaId) {
          const cancha = this.canchas.find(c => c.id === this.reserva.canchaId);
          this.selectedCancha = cancha || null;
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
    console.log('Cancha seleccionada:', event.value);
    if (event.value) {
      this.selectedCancha = event.value;
      this.reserva.canchaId = event.value.idCancha;  // Asegúrate de que idCancha está presente
    } else {
      this.selectedCancha = null;
      this.reserva.canchaId = null;
    }
  }
  
  

  buscarClientePorCI(): void {
    if (this.ciBusqueda.length >= 6) {
      this.clienteService.buscarClientePorCI(this.ciBusqueda).subscribe({
        next: (cliente: Cliente) => this.clientes = cliente ? [cliente] : [],
        error: (error) => {
          console.error('Error al buscar cliente', error);
          this.clientes = [];
        }
      });
    } else {
      this.loadAllClientes();
    }
  }

  private loadAllClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (error) => {
        console.error('Error al listar clientes', error);
        this.clientes = [];
      }
    });
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.nombre = cliente.nombre;
  }

  saveReserva(): void {
    if (!this.validateReserva()) return;
  
    if (!this.selectedCancha) {
      console.error('Debe seleccionar una cancha.');
      return;  // Agregar esta validación adicional
    }
  
    const reservaCompleta = {
      ...this.reserva,
      idEmpresa: 1,
      idUsuario: this.authService.getCurrentUserId(),
      fecha: this.reserva.fecha || new Date().toISOString(),
      horaInicio: this.convertirHora24h(this.horaInicio),
      horaFin: this.convertirHora24h(this.horaFin),
      clienteId: this.clienteSeleccionado?.idCliente,
      canchaId: this.selectedCancha.id, // Asegurarse de que selectedCancha tiene un id
      sucursalId: this.selectedSucursal?.id
    };
  
    const reservaObservable = this.reserva.idReserva
      ? this.reservaService.updateReserva(reservaCompleta)
      : this.reservaService.createReserva(reservaCompleta);
  
    reservaObservable.subscribe({
      next: (reservaGuardada) => {
        console.log('Reserva guardada exitosamente:', reservaGuardada);
        this.dialogRef.close(reservaGuardada);
      },
      error: (err) => {
        console.error('Error al guardar reserva:', err);
      }
    });
  }
  
  private validateReserva(): boolean {
    const errors = [];

    if (!this.selectedSucursal) errors.push('Debe seleccionar una sucursal');
    if (!this.selectedCancha) errors.push('Debe seleccionar una cancha');
    if (!this.clienteSeleccionado) errors.push('Debe seleccionar un cliente');
    if (!this.horaInicio || !this.horaFin) errors.push('Debe especificar horario');
    if (!this.currentUserId) errors.push('Usuario no autenticado');

    if (errors.length > 0) {
      console.warn('Errores de validación:', errors.join(', '));
      return false;
    }

    return true;
  }

  private convertirHora24h(hora: string): string {
    if (!hora) return '';

    const [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier) {
      hours = (modifier === 'PM' && hours !== '12' ? parseInt(hours, 10) + 12 : (modifier === 'AM' && hours === '12' ? '00' : hours)).toString();
    }

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
