import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';  // No es necesario importar MonthViewDay
import { ReservaService } from '../reserva.service';
import { Reserva } from '../reserva.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservaModalComponent } from '../reserva-modal/reserva-modal.component';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private reservaService: ReservaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadReservas();
  }

  loadReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.events = reservas.map(reserva => ({
        start: new Date(reserva.fecha + ' ' + reserva.horaInicio),
        end: new Date(reserva.fecha + ' ' + reserva.horaFin),
        title: `Reserva de ${reserva.clienteId}`,
        meta: reserva
      }));
    });
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '400px',
      data: { reserva: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReservas();
      }
    });
  }

  editEvent(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '400px',
      data: { reserva: event.meta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReservas();
      }
    });
  }

  deleteEvent(event: CalendarEvent): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      this.reservaService.deleteReserva(event.meta.idReserva).subscribe(() => {
        this.loadReservas();
      });
    }
  }

  // Implementación de eventClicked
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.editEvent(event);  // Abre el modal de edición de la reserva
  }

  // Eliminar la dependencia de MonthViewDay y usar la propiedad 'date' directamente
  dayClicked({ day }: { day: { date: Date } }): void {
    const selectedDate = day.date; // Usar la fecha directamente
    this.addEvent();  // Abrir el modal para agregar una nueva reserva
  }
}
