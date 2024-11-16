import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  // Inicializa la variable producto con un objeto vacío o con valores predeterminados
  producto: Producto = {
    id_producto: 0,
    nombre: '',
    precio_unitario: 0,   // Cambié 'precio' por 'precio_unitario'
    cantidad_disponible: 0,  // Cambié 'cantidad' por 'cantidad_disponible'
    tipo: ''
  };

  constructor(private productoService: ProductoService) {}

  onSubmit() {
    console.log('Producto que se enviará:', this.producto);  // Verifica que todos los campos estén correctamente asignados
    this.productoService.createProducto(this.producto).subscribe(
      response => {
        console.log('Producto agregado:', response);
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }
  
  
}
