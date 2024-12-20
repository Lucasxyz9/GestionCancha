import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';  // Importa el servicio
import { Producto, EstadoProducto } from '../producto.model'; // Asegúrate de importar correctamente las interfaces
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "¿Está seguro de que desea eliminar el producto?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe(
          () => {
            // Recargar los productos después de la eliminación
            this.cargarProductos(); // Llamamos a cargarProductos para obtener la lista actualizada
            Swal.fire("¡Eliminado!", "El producto ha sido eliminado exitosamente.", "success");
          },
          (error) => {
            console.error('Error al eliminar producto', error);
            Swal.fire("Error", "No se pudo eliminar el producto. Intente de nuevo más tarde.", "error");
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "La operación fue cancelada.", "info");
      }
    });
  }
  
  


  deleteSeleccionados(): void {
    const seleccionados = this.productos
      .filter((producto) => producto.selected)
      .map((producto) => producto.id_producto);
  
    if (seleccionados.length === 0) {
      Swal.fire("Atención", "Por favor selecciona al menos un producto para eliminar.", "info");
      return;
    }
  
    Swal.fire({
      title: "¿Está seguro de que desea eliminar los productos seleccionados?",
      text: `Se eliminarán ${seleccionados.length} productos.`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        let eliminacionesCompletadas = 0;
  
        seleccionados.forEach((id) => {
          this.productoService.deleteProducto(id).subscribe(
            () => {
              eliminacionesCompletadas++;
              // Al final de todas las eliminaciones, recargamos la lista
              if (eliminacionesCompletadas === seleccionados.length) {
                this.cargarProductos(); // Recargamos la lista después de eliminar todos
                Swal.fire("¡Eliminados!", "Los productos seleccionados han sido eliminados exitosamente.", "success");
              }
            },
            (error) => {
              console.error(`Error al eliminar el producto con ID ${id}`, error);
              Swal.fire("Error", "Ocurrió un problema al eliminar algunos productos. Intente de nuevo más tarde.", "error");
            }
          );
        });
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "La operación fue cancelada.", "info");
      }
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
  

