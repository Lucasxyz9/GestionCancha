import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../sucursales.service';
import { EstadoSucursal, Sucursal } from '../sucursal.model';

@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursales-form.component.html',
  styleUrls: ['./sucursales-form.component.css']
})
export class SucursalFormComponent implements OnInit {
  sucursal: Sucursal = {
    idSucursal: 0,
    nombre: '',
    ubicacion: '',
    timbrado: ''
  };

  constructor(private sucursalService: SucursalService) {}

  ngOnInit(): void {
    // Inicialización adicional si es necesario (modo edición, cargar datos, etc.)
  }

  onSubmit(): void {
    console.log('Datos enviados:', this.sucursal);
    if (this.sucursal.nombre && this.sucursal.ubicacion && this.sucursal.timbrado) {
      this.sucursalService.createSucursal(this.sucursal).subscribe({
        next: (response) => {
          console.log('Sucursal creada:', response);
          alert('Sucursal creada con éxito');
        },
        error: (err) => {
          console.error('Error al crear la sucursal:', err);
          alert('Ocurrió un error al crear la sucursal');
        }
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
  guardarSucursal(sucursal: EstadoSucursal) {
    const id = sucursal.idSucursal;  // Asegúrate de usar el nombre correcto para el ID
    if (id) {
      this.sucursalService.updateSucursal(id, sucursal).subscribe(
        (response) => {
          // Manejar respuesta exitosa
          console.log('Sucursal actualizada', response);
        },
        (error) => {
          console.error('Error al guardar la sucursal: ', error);
        }
      );
    } else {
      console.error('El ID de la sucursal no está definido');
    }
  }
}
