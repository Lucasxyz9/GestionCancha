import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  // Inicializa la variable producto con un objeto vacío o con valores predeterminados
  producto: Producto = {
    id_producto: 0,
    nombre: '',
    precio_unitario: 0,
    cantidad_disponible: 0,
    cantidadMinima:0,
    tipo: ''
  };

  productos: Producto[] = []; // Array para almacenar la lista de productos

  constructor(private productoService: ProductoService) {}

  // Llama al servicio para obtener los productos cuando se inicia el componente
  ngOnInit(): void {
    this.cargarProductos(); // Cargar productos al iniciar el componente
  }

  // Método para cargar los productos
  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos; // Asigna los productos al array productos
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  // Método para agregar un nuevo producto
  onSubmit(): void {
    console.log('Producto que se enviará:', this.producto); // Verifica que todos los campos estén correctamente asignados
    
    // Verificar si el producto ya existe (comparando por nombre)
    const productoDuplicado = this.productos.some(p => p.nombre === this.producto.nombre);

    if (productoDuplicado) {
      alert('El producto ya existe.'); // Muestra un mensaje si el producto ya existe
      return; // Detener el proceso si es un duplicado
    }

    // Si no es duplicado, agregar el producto
    this.productoService.createProducto(this.producto).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.cargarProductos(); // Recargar productos después de agregar
        this.resetFormulario(); // Limpiar el formulario
      },
      (error) => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  // Método para limpiar el formulario después de agregar un producto
  resetFormulario(): void {
    this.producto = {
      id_producto: 0,
      nombre: '',
      precio_unitario: 0,
      cantidad_disponible: 0,
      cantidadMinima:0,
      tipo: ''
    };
  }
}
