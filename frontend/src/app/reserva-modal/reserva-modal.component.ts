import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss']
})
export class ReservaModalComponent implements OnInit {
  reserva: any = {};
  isModalOpen = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reserva: any },
    private dialogRef: MatDialogRef<ReservaModalComponent>
  ) {}

  ngOnInit(): void {
    this.reserva = this.data.reserva || {};
  }

  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
  
  saveReserva() {
    const form = document.getElementById('reservaForm') as HTMLFormElement;
    if (form.checkValidity()) {
      // Simulación de guardado
      console.log('Reserva guardada:', this.getFormData());
      this.closeModal();
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  getFormData() {
    const form = document.getElementById('reservaForm') as HTMLFormElement;
    const formData: any = {};
    new FormData(form).forEach((value, key) => {
      formData[key] = value;
    });
    return formData;
  }
}
