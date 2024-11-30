import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SUCURSALES } from '../shared/sucursales-lista';
import { ProductoService } from '../producto.service'; // Servicio para manejar productos
import { TransferenciaService } from '../transferencias.service'; // Servicio para manejar transferencias

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  movimientoForm: FormGroup;
  productos = []; 
  sucursales = SUCURSALES;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private transferenciaService: TransferenciaService
  ) {
    this.movimientoForm = this.fb.group({
      sucursalOrigen: ['', Validators.required],
      producto: ['', Validators.required],
      sucursalDestino: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onSucursalOrigenChange(): void {
    const idSucursal = this.movimientoForm.get('sucursalOrigen')?.value;
    if (idSucursal) {
      this.productoService.getProductosPorSucursal(idSucursal).subscribe((productos) => {
        this.productos = productos;
      });
    }
  }

  getMaxCantidad(): number {
    const productoId = this.movimientoForm.get('producto')?.value;
    const producto = this.productos.find((p) => p.id_producto === productoId);
    return producto ? producto.cantidad_disponible : 0;
  }

  onSubmit(): void {
    if (this.movimientoForm.valid) {
      const transferencia = this.movimientoForm.value;
      this.transferenciaService.registrarTransferencia(transferencia).subscribe(() => {
        alert('Transferencia registrada exitosamente');
        this.movimientoForm.reset();
        this.productos = [];
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}
