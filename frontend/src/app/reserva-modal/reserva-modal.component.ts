import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.css']
})
export class ReservaModalComponent {
  reservaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    public dialogRef: MatDialogRef<ReservaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Si existe reserva (modo edición)
    this.reservaForm = this.fb.group({
      idReserva: [data.reserva.idReserva || ''],
      fecha: [data.reserva.fecha || '', Validators.required],
      horaInicio: [data.reserva.horaInicio || '', Validators.required],
      horaFin: [data.reserva.horaFin || '', Validators.required],
      clienteId: [data.reserva.clienteId || '', Validators.required],
      canchaId: [data.reserva.canchaId || '', Validators.required],
      sucursalId: [data.reserva.sucursalId || '', Validators.required]
    });
  }

  saveReserva(): void {
    if (this.reservaForm.valid) {
      if (this.reservaForm.value.idReserva) {
        // Editar reserva existente
        this.reservaService.updateReserva(this.reservaForm.value).subscribe(() => {
          this.dialogRef.close(true); // Cierra el modal y notifica al componente padre
        });
      } else {
        // Crear nueva reserva
        this.reservaService.createReserva(this.reservaForm.value).subscribe(() => {
          this.dialogRef.close(true); // Cierra el modal y notifica al componente padre
        });
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
