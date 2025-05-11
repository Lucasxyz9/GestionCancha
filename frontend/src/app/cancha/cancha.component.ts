import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanchaService } from './../cancha.service';
import { SucursalService } from './../sucursales.service';
import { Cancha } from './../cancha.model';
import { Sucursal } from './../sucursal.model';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.component.html',
  styleUrls: ['./cancha.component.css']
})
export class CanchaComponent implements OnInit {
  canchaForm!: FormGroup;
  canchas: Cancha[] = [];
  sucursales: Sucursal[] = [];
  sucursalMap: Map<number, string> = new Map();
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private canchaService: CanchaService,
    private sucursalService: SucursalService
  ) {}

  ngOnInit(): void {
    this.canchaForm = this.fb.group({
      idCancha: [null],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      estado: ['', Validators.required],
      idSucursal: [0, Validators.required]
    });

    this.obtenerCanchas();
    this.obtenerSucursales();
  }

  obtenerCanchas() {
    this.canchaService.getAllCanchas().subscribe(
      (canchas) => {
        this.canchas = canchas;
        console.log('Canchas obtenidas:', this.canchas);
      },
      (error) => {
        console.error('Error al obtener canchas:', error);
      }
    );
  }

  obtenerSucursales() {
    this.sucursalService.getSucursales().subscribe(sucursales => {
      this.sucursales = sucursales;
      this.sucursales.forEach(sucursal => {
        this.sucursalMap.set(sucursal.idSucursal, sucursal.nombre);
      });
    });
  }

crearOActualizarCancha() {
  if (this.canchaForm.valid) {
    const canchaFormValue = this.canchaForm.value;

    const cancha = {
      ...canchaFormValue,
      sucursal: { idSucursal: canchaFormValue.idSucursal }
    };
    delete cancha.idSucursal;

    console.log('Datos enviados:', cancha);

    if (cancha.idCancha) {
      this.canchaService.updateCancha(cancha).subscribe(
        (response) => {
          console.log('Respuesta al actualizar:', response);
          this.obtenerCanchas();
          this.canchaForm.reset();
        },
        (error) => {
          console.error('Error al actualizar la cancha:', error);
        }
      );
    } else {
      this.canchaService.createCancha(cancha).subscribe(
        (response) => {
          console.log('Respuesta al crear:', response);
          this.obtenerCanchas();
          this.canchaForm.reset();
        },
        (error) => {
          console.error('Error al crear la cancha:', error);
          if (error.error) {
            console.error('Detalles del error:', error.error);
          }
        }
      );
    }
  } else {
    console.warn('Formulario inválido, verifique los campos.');
  }
}

  editarCancha(cancha: Cancha) {
    this.canchaForm.patchValue({
      idCancha: cancha.idCancha,
      nombre: cancha.nombre,
      ubicacion: cancha.ubicacion,
      estado: cancha.estado,
      idSucursal: cancha.sucursal?.idSucursal || 0
    });
  }

  eliminarCancha(idCancha: number) {
    this.canchaService.deleteCancha(idCancha).subscribe(
      () => this.obtenerCanchas(),
      (error) => console.error('Error al eliminar la cancha:', error)
    );
  }

  obtenerNombreSucursal(idSucursal?: number): string {
    if (!idSucursal) return 'Sucursal no encontrada';
    return this.sucursalMap.get(idSucursal) || 'Sucursal no encontrada';
  }
  
}
