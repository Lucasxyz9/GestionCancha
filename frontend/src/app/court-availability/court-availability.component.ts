import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/reserva.service';
import { CanchaService } from 'src/app/cancha.service';
import { Cancha } from '../cancha.model';
import { formatDate } from '@angular/common';

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
    private canchaService: CanchaService
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
      const fechaStr = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
      this.reservaService.getReservasPorFecha(fechaStr).subscribe(reservas => {
        this.reservas = reservas;
        this.mostrarDetalle = false;
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
    return this.reservas.some(r => {
      if (r.cancha.idCancha !== canchaId) return false;
      if (r.fecha !== formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US')) return false;

      const inicioMin = this.horaAMinutos(r.horaInicio);
      const finMin = this.horaAMinutos(r.horaFin);
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
    if (!this.isOcupada(canchaId, hora)) {
      this.mostrarDetalle = false;
      this.reservasSeleccionadas = [];
      return;
    }
    const horaMin = this.horaAMinutos(hora);
    this.reservasSeleccionadas = this.reservas.filter(r => {
      if (r.cancha.idCancha !== canchaId) return false;
      if (r.fecha !== formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US')) return false;

      const inicioMin = this.horaAMinutos(r.horaInicio);
      const finMin = this.horaAMinutos(r.horaFin);

      return horaMin >= inicioMin && horaMin < finMin;
    });

    this.mostrarDetalle = true;
  }

}
