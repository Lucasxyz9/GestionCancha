import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
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
    title: `Reserva de Cliente: ${reserva.cliente.nombre} ${reserva.cliente.apellido}`,
    meta: reserva,
  }));

  });
}



  addEvent(): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '400px',
      data: { reserva: {} }  // Pasa un objeto vacío si es una nueva reserva
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el modal devuelve un resultado (reserva creada o editada)
        this.loadReservas();
        this.reservaService.setReserva(result);  // Notifica a otros componentes (por ejemplo, ReservaComponent)
      }
    });
  }

  editEvent(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '400px',
      data: { reserva: event.meta }  // Pasa la reserva a editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el modal devuelve un resultado (reserva editada)
        this.loadReservas();
        this.reservaService.setReserva(result);  // Notifica a otros componentes (por ejemplo, ReservaComponent)
      }
    });
  }

  deleteEvent(event: CalendarEvent): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      this.reservaService.deleteReserva(event.meta.idReserva).subscribe(() => {
        // Una vez eliminada, recarga las reservas
        this.loadReservas();
      });
    }
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.editEvent(event);  // Abre el modal para editar la reserva
  }

  dayClicked({ day }: { day: { date: Date } }): void {
    const selectedDate = day.date;

    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '400px',
      data: {
        reserva: {
          fecha: selectedDate.toISOString().split('T')[0]  // formato yyyy-MM-dd
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReservas();
        this.reservaService.setReserva(result);
      }
    });
  }

}
