import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../../movimiento.service';
import { SUCURSALES } from 'src/app/shared/sucursales-lista';

@Component({
  selector: 'app-movimiento-list',
  templateUrl: './movimiento-list.component.html',
  styleUrls: ['./movimiento-list.component.css']
})
export class MovimientoListComponent implements OnInit {
  sucursales= SUCURSALES
  movimientos: any[] = [];  // Array para almacenar los movimientos

  constructor(private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    this.loadMovimientos();
  }

  loadMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe((movimientos) => {
      this.movimientos = movimientos;
    });
  }

  // Eliminar un movimiento
  deleteMovimiento(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este movimiento?')) {
      this.movimientoService.deleteMovimiento(id).subscribe(() => {
        this.loadMovimientos();  // Recargar la lista después de eliminar
      });
    }
  }

  // Ver detalles del movimiento
viewMovimiento(id: number): void {
  this.movimientoService.getMovimientos().subscribe((movimientos) => {
    const movimiento = movimientos.find(mov => mov.id === id);
    if (movimiento) {
      console.log(movimiento);  // Aquí podrías redirigir a una vista detallada o mostrar un modal
    }
  });
}
}
