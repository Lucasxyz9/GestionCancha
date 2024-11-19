import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';  // Importa el servicio
import { Producto, EstadoProducto } from '../producto.model'; // Asegúrate de importar correctamente las interfaces

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  // Aquí solo debes tener una propiedad 'productos'
  productos: EstadoProducto[] = [];  // Solo se declara aquí una vez

  // Variable para manejar un solo producto
  producto: Producto = { 
    id_producto: 0, 
    nombre: '', 
    precio_unitario: 0, 
    tipo: '', 
    cantidad_disponible: 0 
  };

  // Método para manejar el envío de productos
  onSubmit() {
    // Validar si el producto ya existe en la lista
    const productoDuplicado = this.productos.some(p => p.nombre === this.producto.nombre);
  
    if (productoDuplicado) {
      alert("Este producto ya existe.");
      return;  // Detener el proceso si el producto es duplicado
    }
  
    console.log(this.producto);  // Verifica que todos los campos estén presentes
    this.productoService.createProducto(this.producto).subscribe(
      response => {
        console.log('Producto agregado:', response);
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }
  

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos.map((producto) => ({
        ...producto,
        editing: false,
        selected: false
      })) as EstadoProducto[];
    },
    (error: any) => {
      console.error('Error al cargar productos', error);
    
    });
    
  }
  
  
  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos.map((producto) => ({
          ...producto,
          editing: false, 
          selected: false
        })) as EstadoProducto[]; // Asegura el tipo adecuado
        console.log('Productos cargados correctamente:', this.productos);
      },
      (error: any) => {
        console.error('Error al cargar productos', error);
      }
    );
  }
  

  deleteProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe(
      () => {
        // Recargar los productos después de la eliminación
        this.cargarProductos();  // Llamamos a cargarProductos para obtener la lista actualizada
      },
      (error) => {
        console.error('Error al eliminar producto', error);
      }
    );
  }
  


  deleteSeleccionados(): void {
    const seleccionados = this.productos
      .filter((producto) => producto.selected)
      .map((producto) => producto.id_producto);
  
    if (seleccionados.length === 0) {
      alert("Por favor selecciona al menos un producto para eliminar.");
      return;
    }
  
    seleccionados.forEach((id, index) => {
      this.productoService.deleteProducto(id).subscribe(() => {
        if (index === seleccionados.length - 1) {
          // Al final de todas las eliminaciones, actualizamos la lista
          this.cargarProductos();  // Recargamos la lista después de la eliminación
        }
      });
    });
  }
  
  

  

  updateProducto(producto: EstadoProducto): void {
    this.productoService.updateProducto(producto.id_producto, producto).subscribe(
      () => {
        producto.editing = false; // Salir del modo de edición
        alert("Producto actualizado exitosamente");
        this.cargarProductos(); // Recargar la lista completa
      },
      (error) => {
        alert("Error al actualizar el producto. Intenta de nuevo.");
        console.error("Error al actualizar el producto", error);
      }
    );
  }
  
  
  
}
