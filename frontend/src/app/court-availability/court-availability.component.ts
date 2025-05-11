import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-court-availability',
  templateUrl: './court-availability.component.html',
  styleUrls: ['./court-availability.component.css']  // Cambiado a .css
})
export class CourtAvailabilityComponent implements OnInit {
  selectedDate: Date = new Date();
  displayedColumns: string[] = ['hora', 'cancha1', 'cancha2', 'cancha3'];
  
  timeSlots: any[] = [
    { hora: '08:00', cancha1: true, cancha2: true, cancha3: false },
    { hora: '09:00', cancha1: true, cancha2: false, cancha3: false },
    { hora: '10:00', cancha1: false, cancha2: true, cancha3: true },
    { hora: '11:00', cancha1: true, cancha2: true, cancha3: false },
    { hora: '12:00', cancha1: true, cancha2: false, cancha3: true },
    { hora: '13:00', cancha1: false, cancha2: true, cancha3: true },
    { hora: '14:00', cancha1: true, cancha2: true, cancha3: false },
    { hora: '15:00', cancha1: false, cancha2: false, cancha3: true },
    { hora: '16:00', cancha1: true, cancha2: true, cancha3: true },
    { hora: '17:00', cancha1: true, cancha2: false, cancha3: false },
    { hora: '18:00', cancha1: false, cancha2: true, cancha3: true },
    { hora: '19:00', cancha1: true, cancha2: true, cancha3: false },
    { hora: '20:00', cancha1: true, cancha2: true, cancha3: true },
  ];

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private snackBar: MatSnackBar,
    private reservaService: ReservaService
  ) {
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.loadAvailability();
  }

  onDateChange(): void {
    this.loadAvailability();
  }

  loadAvailability(): void {
    const fecha = this.selectedDate.toISOString().split('T')[0];
    this.reservaService.getDisponibilidad(fecha).subscribe(
      data => {
        this.timeSlots = data;
      },
      error => {
        this.snackBar.open('Error al cargar disponibilidad', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  reservar(cancha: string, hora: string): void {
    const reserva = {
      fecha: this.selectedDate,
      cancha: cancha,
      hora: hora,
      usuario: 'currentUser'
    };

    this.reservaService.createReserva(reserva).subscribe(
      response => {
        this.snackBar.open(`Reserva para ${cancha} a las ${hora} confirmada`, 'Cerrar', {
          duration: 3000
        });
        this.loadAvailability();
      },
      error => {
        this.snackBar.open('Error al realizar reserva', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  getAvailabilityClass(isAvailable: boolean): string {
    return isAvailable ? 'disponible' : 'ocupada';
  }
}