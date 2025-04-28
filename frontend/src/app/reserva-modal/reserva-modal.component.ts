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
  // Valores hardcodeados
  currentUserId: number = 1;
  empresaId: number = 1;

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
  }

  private initializeFormData(): void {
    this.reserva = this.data?.reserva || {};
    
    // Asegurar valores hardcodeados
    this.reserva.idEmpresa = this.empresaId;
    this.reserva.idUsuario = this.currentUserId;

    if (this.data?.reserva) {
      // Normalizamos el ID de cancha
      this.reserva.idCancha = this.reserva.canchaId || this.reserva.idCancha;
      delete this.reserva.canchaId; // Eliminamos la propiedad duplicada
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
  
          // Si hay sucursalId en la reserva, selecciona la sucursal y carga las canchas
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
          // Si hay idCancha en la reserva, selecciona la cancha
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
  

  saveReserva(): void {
    if (!this.validateReserva()) return;
  
    const reservaPayload = {
      ...this.reserva,
      idEmpresa: this.empresaId, // Usamos el valor hardcodeado
      idUsuario: this.currentUserId, // Usamos el valor hardcodeado
      fecha: this.formatDate(this.reserva.fecha),
      horaInicio: this.convertirHora24h(this.horaInicio),
      horaFin: this.convertirHora24h(this.horaFin),
      cliente: {
        idCliente: this.clienteSeleccionado?.idCliente
      },
      cancha: {
        idCancha: this.selectedCancha?.idCancha
      },
      empresa: {
        idEmpresa: this.empresaId // Añadido para consistencia con el servicio
      },
      usuario: {
        idUsuario: this.currentUserId // Añadido para consistencia con el servicio
      }
    };
  
    console.log('Datos a enviar:', reservaPayload);
  
    const reservaObservable = this.reserva.idReserva
      ? this.reservaService.updateReserva(reservaPayload)
      : this.reservaService.crearReserva(reservaPayload);
  
      reservaObservable.subscribe({
        next: (reservaGuardada) => {
          // Verifica si es una respuesta de éxito antes de mostrar la consola
          if (reservaGuardada) {
            console.log('Reserva guardada exitosamente');
            // Actualiza el estado en el servicio
            this.reservaService.setReserva(reservaGuardada);
        
            // Cierra el modal y pasa la reserva guardada
            this.dialogRef.close(reservaGuardada);
          }
        },
        

        
      });
    
      
  }
  

  // Resto de los métodos permanecen igual...
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
      console.log('Cancha seleccionada:', this.selectedCancha);
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

  private formatDate(date: any): string {
    return date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  }

  private validateReserva(): boolean {
    const errors = [];
  
    if (!this.selectedSucursal) errors.push('Debe seleccionar una sucursal');
    if (!this.selectedCancha?.idCancha) errors.push('Debe seleccionar una cancha válida');
    if (!this.clienteSeleccionado?.idCliente) errors.push('Debe seleccionar un cliente válido');
    if (!this.horaInicio || !this.horaFin) errors.push('Debe especificar horario completo');
    if (!this.reserva.fecha) errors.push('Debe seleccionar una fecha');
  
    if (errors.length > 0) {
      console.warn('Errores de validación:', errors.join(', '));
      // Aquí podrías mostrar estos errores al usuario
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

  public compareCanchas(c1: Cancha, c2: Cancha): boolean {
    return c1 && c2 ? c1.idCancha === c2.idCancha : c1 === c2;
  }
}