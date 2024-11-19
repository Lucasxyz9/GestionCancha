import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';  // Importa el servicio
import { Producto, EstadoProducto } from '../producto.model'; // Asegúrate de importar correctamente las interfaces

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  productos: EstadoProducto[] = [];  // Solo se declara aquí una vez

  producto: Producto = { 
    id_producto: 0, 
    nombre: '', 
    precio_unitario: 0, 
    tipo: '', 
    cantidad_disponible: 0,
    cantidadMinima: 10
  };
  cantidadMinima: number = 10; 

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
      console.log(this.productos);  // Verifica que los datos se estén cargando correctamente

  }
  
  
  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        // Asegurar que cada producto tenga las propiedades necesarias
        this.productos = productos.map(producto => ({
          ...producto,
          cantidad_minima: producto.cantidadMinima ?? 0, // Valor por defecto si no existe
          editing: false,
          selected: false
        }));
        console.log('Productos cargados:', this.productos);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
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
  
  toggleSeleccionarTodos(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.productos.forEach((producto) => (producto.selected = checked));
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
  editarProducto(producto: EstadoProducto): void {
    producto.editing = true;
  }

  guardarProducto(producto: EstadoProducto): void {
    if (!producto.id_producto) {
      console.error('El producto no tiene un id definido');
      return;
    }
  
    this.productoService.updateProducto(producto.id_producto, producto).subscribe({
      next: (updatedProducto) => {
        producto.editing = false;
        console.log('Producto actualizado:', updatedProducto);
      },
      error: (error) => console.error('Error al guardar el producto:', error)
    });
  }
  
  cancelarEdicion(producto: EstadoProducto): void {
    producto.editing = false;
    // Vuelve a cargar los productos si es necesario para revertir los cambios
    this.ngOnInit();
  }

  
}
  

