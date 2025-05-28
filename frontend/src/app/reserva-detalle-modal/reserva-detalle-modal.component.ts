import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva-detalle-modal',
  templateUrl: './reserva-detalle-modal.component.html',
  styleUrls: ['./reserva-detalle-modal.component.css']
})
export class ReservaDetalleModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReservaDetalleModalComponent>
  ) {}
}
