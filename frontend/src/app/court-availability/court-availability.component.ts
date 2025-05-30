import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/reserva.service';
import { CanchaService } from 'src/app/cancha.service';
import { Cancha } from '../cancha.model';
import { formatDate } from '@angular/common';
import { ReservaDetalleModalComponent } from '../reserva-detalle-modal/reserva-detalle-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-court-availability',
  templateUrl: './court-availability.component.html',
  styleUrls: ['./court-availability.component.css']
})
export class CourtAvailabilityComponent implements OnInit {

  selectedDate: Date = new Date();
  canchas: Cancha[] = [];
  reservas: any[] = [];
  horas: string[] = []; 

  displayedColumns: string[] = [];

  reservasSeleccionadas: any[] = [];
  mostrarDetalle: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private canchaService: CanchaService,
    private dialog: MatDialog

    
  ) {}

  ngOnInit(): void {
    this.generarHoras();
    this.cargarDatos();
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.cargarDatos();
    this.mostrarDetalle = false;
  }

  generarHoras() {
    this.horas = [];
    for (let h = 8; h <= 22; h++) {
      this.horas.push(h.toString().padStart(2, '0') + ':00');
    }
  }

cargarDatos() {
  this.canchaService.getAllCanchas().subscribe(canchas => {
    this.canchas = canchas;
    this.displayedColumns = ['hora', ...this.canchas.map(c => 'cancha-' + c.idCancha)];

const fechaStr = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US').trim();

    this.reservaService.getReservasPorFecha(fechaStr).subscribe(reservas => {
      this.reservas = reservas;
      this.mostrarDetalle = false;
    this.reservaService.getReservasPorFecha(fechaStr).subscribe(reservas => {
    console.log('Reservas recibidas:', reservas); // <- ¿aparece esto?
    this.reservas = reservas;
    this.mostrarDetalle = false;
});
  
    });
  });
}


  isEnMantenimiento(c: Cancha): boolean {
    return c.estado.toLowerCase() === 'mantenimiento';
  }

  private horaAMinutos(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  }

isOcupada(canchaId: number, hora: string): boolean {
  const horaMin = this.horaAMinutos(hora);
  const fechaFormateada = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US').trim();

  return this.reservas.some(r => {
    if (r.cancha.idCancha !== canchaId) return false;
    if (r.fecha.trim() !== fechaFormateada) return false;

    const inicioMin = this.horaAMinutos(r.horaInicio);
    const finMin = this.horaAMinutos(r.horaFin);

    // Para debug, puedes imprimir estos valores en consola
    console.log(`Comparando horaMin=${horaMin} con rango ${inicioMin} - ${finMin}`);

    // Aquí chequeamos si horaMin está dentro del rango [inicioMin, finMin)
    return horaMin >= inicioMin && horaMin < finMin;
  });
}



  getClaseCelda(canchaId: number, hora: string): string {
    const cancha = this.canchas.find(c => c.idCancha === canchaId);
    if (!cancha) return '';

    if (this.isEnMantenimiento(cancha)) return 'no-disponible';
    if (this.isOcupada(canchaId, hora)) return 'ocupada';

    return 'disponible';
  }

  getTextoEstado(canchaId: number, hora: string): string {
    const cancha = this.canchas.find(c => c.idCancha === canchaId);
    if (!cancha) return '';

    if (this.isEnMantenimiento(cancha)) return 'No disponible';
    if (this.isOcupada(canchaId, hora)) return 'Ocupada';

    return 'Disponible';
  }

mostrarReservas(canchaId: number, hora: string) {
  const horaMin = this.horaAMinutos(hora);
  const fechaFormateada = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US').trim();

  const reservasSeleccionadas = this.reservas.filter(r => {
    if (r.cancha.idCancha !== canchaId) return false;
    if (r.fecha.trim() !== fechaFormateada) return false;

    const inicioMin = this.horaAMinutos(r.horaInicio);
    const finMin = this.horaAMinutos(r.horaFin);
    return horaMin >= inicioMin && horaMin < finMin;
  });

  // Mostrar el modal solo si hay reservas
  this.dialog.open(ReservaDetalleModalComponent, {
    width: '400px',
    data: { reservas: reservasSeleccionadas }
  });
}









}
