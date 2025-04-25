import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss']
})
export class ReservaModalComponent implements OnInit {
  reserva: any = {};
  
  horaInicio: string = '';
  horaFin: string = '';
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    public dialogRef: MatDialogRef<ReservaModalComponent>
  ) {}

  ngOnInit(): void {
    this.reserva = this.data?.reserva || {};
    
    // Inicializar las horas si existen en la reserva
    if (this.reserva.horaInicio) {
      this.horaInicio = this.reserva.horaInicio;
    }
    
    if (this.reserva.horaFin) {
      this.horaFin = this.reserva.horaFin;
    }
  }
  
  // ... resto de tus métodos
  
  saveReserva() {
    // Asignar las horas seleccionadas al objeto reserva antes de guardar
    this.reserva.horaInicio = this.horaInicio;
    this.reserva.horaFin = this.horaFin;
    
    // Resto de tu lógica de guardado
    console.log('Reserva guardada:', this.reserva);
    this.dialogRef.close(this.reserva);
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra el modal sin pasar datos
  }
  
}