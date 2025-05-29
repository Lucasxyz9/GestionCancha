import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';
import { SucursalService } from '../sucursales.service';
import { CanchaService } from '../cancha.service';
import { Cliente } from '../clientes.model';
import { ReservaService } from '../reserva.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

interface Sucursal {
  id: number;
  idSucursal?: number;
  nombre: string;
  ubicacion?: string;
  timbrado?: string;
}

interface Cancha {
  idCancha: number;
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
  empresaId: number = 1;

  mostrarReclamos: boolean = false;  // <-- VARIABLE para mostrar textarea reclamos
mostrarIndumentaria = false;
indumentariaTexto: string = '';
  mostrarSanciones: boolean = false;

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
    this.initializeFormData();

    this.loadSucursales();
    this.setFechaSiguiente();

      this.indumentariaTexto = this.reserva.indumentaria || '';

  }

  private sumarUnDia(fecha: Date): Date {
    const fechaSiguiente = new Date(fecha);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);
    return fechaSiguiente;
  }

  private setFechaSiguiente(): void {
    if (this.reserva.fecha) {
      this.reserva.fecha = this.sumarUnDia(new Date(this.reserva.fecha));
    } else {
      this.reserva.fecha = this.sumarUnDia(new Date());
    }
  }

  private initializeFormData(): void {
    this.reserva = this.data?.reserva || {};
    this.reserva.indumentaria = this.reserva.indumentaria || '';
    this.reserva.reclamos = this.reserva.reclamos || '';
    this.reserva.sanciones = this.reserva.sanciones || '';
    
    this.reserva.idEmpresa = this.empresaId;
    this.reserva.idUsuario = this.currentUserId;

    if (this.reserva.horaInicio) {
    this.reserva.horaInicio = this.convertirHoraAMPM(this.reserva.horaInicio);
  }
    if (this.reserva.horaFin) {
    this.reserva.horaFin = this.convertirHoraAMPM(this.reserva.horaFin);
  }


    if (!this.reserva.fecha) {
      this.reserva.fecha = new Date();
    }

    if (this.data?.reserva) {
      this.reserva.idCancha = this.reserva.canchaId || this.reserva.idCancha;
      delete this.reserva.canchaId;
    }
  }

  loadSucursales(): void {
    this.sucursalService.getSucursales().subscribe({
      next: (sucursales: any[]) => {
        if (Array.isArray(sucursales)) {
          this.sucursales = sucursales.map(s => ({
            id: s.id || s.idSucursal,
            nombre: s.nombre,
            ubicacion: s.ubicacion || '',
            timbrado: s.timbrado || ''
          }));
  
          if (this.reserva.sucursalId) {
            const sucursal = this.sucursales.find(s => s.id === this.reserva.sucursalId);
            if (sucursal) {
              this.selectedSucursal = sucursal;
              this.loadCanchas(sucursal.id);
            }
          }
        } else {
          console.warn('La respuesta de sucursales no es un array', sucursales);
          this.sucursales = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar sucursales', error);
        this.sucursales = [];
      }
    });
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
        if (Array.isArray(canchas)) {
          this.canchas = canchas || [];
          if (this.reserva?.idCancha) {
            const cancha = this.canchas.find(c => c.idCancha === this.reserva.idCancha);
            this.selectedCancha = cancha || null;
          }
        } else {
          console.warn('La respuesta de canchas no es un array', canchas);
          this.canchas = [];
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

private convertirHoraAMPM(hora24: string): string {
  if (!hora24) return '';

  // Separar la hora por ":"
  const parts = hora24.split(':');
  if (parts.length < 2) return hora24; // fallback

  let hour = parseInt(parts[0], 10);
  const minute = parts[1];

  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}



saveReserva(): void {

  // Asignar indumentaria del campo de texto
  this.reserva.indumentaria = this.indumentariaTexto;

  // Verificar que cliente y cancha estén seleccionados
  if (!this.clienteSeleccionado?.idCliente || !this.selectedCancha?.idCancha) {
    Swal.fire({
      title: 'Datos incompletos',
      text: 'Debe seleccionar un cliente y una cancha.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  console.log('Indumentaria:', this.indumentariaTexto);

  // Preparar el payload de la reserva
const reservaPayload = {
  ...this.reserva,
  fecha: this.formatDate(this.reserva.fecha),
  horaInicio: this.convertirHora24h(this.reserva.horaInicio),
  horaFin: this.convertirHora24h(this.reserva.horaFin),
  cliente: { idCliente: this.clienteSeleccionado.idCliente },
  cancha: { idCancha: this.selectedCancha.idCancha },
  empresa: { idEmpresa: this.empresaId },
  usuario: { idUsuario: this.currentUserId },
  indumentaria: this.indumentariaTexto || "",  // Si quieres que nunca sea undefined
};



  console.log('Datos a enviar:', reservaPayload);

  const isEdit = !!this.reserva.idReserva;
  const reservaObservable = isEdit
    ? this.reservaService.updateReserva(reservaPayload)
    : this.reservaService.crearReserva(reservaPayload);

  reservaObservable.subscribe({
    next: (reservaGuardada) =>{
      Swal.fire({
        title: '¡Éxito!',
        text: isEdit ? 'Reserva actualizada correctamente.' : 'Reserva creada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetForm();
        }
      });

      this.reservaService.setReserva(reservaGuardada);
      this.dialogRef.close(reservaGuardada);
    },
    error: (error) => {
      console.error('Error al guardar la reserva:', error);
      Swal.fire({
        title: '¡Error!',
        text: 'Hubo un problema al guardar la reserva.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    },
  });
}






  private resetForm(): void {
    this.reserva = {};
    this.horaInicio = '';
    this.horaFin = '';
    this.ciBusqueda = '';
    this.clientes = [];
    this.clienteSeleccionado = null;
    this.nombre = '';
    this.selectedSucursal = null;
    this.selectedCancha = null;
    this.mostrarReclamos = false;  // Reseteamos checkbox también
  }

  onSucursalChange(event: any): void {
    if (!event?.value?.id) {
      this.resetSucursalSelection();
      return;
    }
    this.selectedSucursal = event.value;
    this.selectedCancha = null;
    this.reserva.idCancha = null;
    this.loadCanchas(event.value.id);
  }

  private resetSucursalSelection(): void {
    this.selectedSucursal = null;
    this.canchas = [];
    this.selectedCancha = null;
    this.reserva.idCancha = null;
  }

  onCanchaChange(event: any): void {
    if (event?.value) {
      this.selectedCancha = event.value;
      this.reserva.idCancha = event.value.idCancha;
    } else {
      this.selectedCancha = null;
      this.reserva.idCancha = null;
    }
  }

  buscarClientePorCI(): void {
    if (!this.ciBusqueda || this.ciBusqueda.length < 6) {
      this.loadAllClientes();
      return;
    }
    this.clienteService.buscarClientePorCI(this.ciBusqueda).subscribe({
      next: (cliente: Cliente) => {
        this.clientes = cliente ? [cliente] : [];
      },
      error: (error) => {
        console.error('Error al buscar cliente', error);
        this.clientes = [];
      }
    });
  }

  private loadAllClientes(): void {
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

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.nombre = cliente.nombre;
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private validateReserva(): boolean {
    const errors = [];
    if (!this.selectedSucursal) errors.push('Debe seleccionar una sucursal');
    if (!this.selectedCancha?.idCancha) errors.push('Debe seleccionar una cancha válida');
    if (!this.clienteSeleccionado?.idCliente) errors.push('Debe seleccionar un cliente válido');
    //if (!this.horaInicio || !this.horaFin) errors.push('Debe especificar horario completo');
    if (!this.reserva.fecha) errors.push('Debe seleccionar una fecha');

    if (errors.length > 0) {
      console.warn('Errores de validación:', errors.join(', '));
      return false;
    }
    return true;
  }

  private convertirHora24h(hora: string): string {
    if (!hora) return '00:00:00';
    const [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier) {
      hours = (modifier === 'PM' && hours !== '12' ? 
        (parseInt(hours, 10) + 12).toString() : 
        (modifier === 'AM' && hours === '12' ? '00' : hours));
    }
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  compareCanchas(c1: Cancha, c2: Cancha): boolean {
    return c1 && c2 ? c1.idCancha === c2.idCancha : c1 === c2;
  }
}
