import { Component, OnInit } from '@angular/core';
import { StockService } from './../../stock.service';
import { Stock } from './../../stock.model';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/producto.service';
import { Sucursal } from 'src/app/sucursal.model';
import { SucursalService } from 'src/app/sucursales.service';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Stock = {
    idProducto: 0,  // El ID del producto es un int
    idSucursal: 0,   // Solo el ID de la sucursal
    cantidad: 0,     // Cantidad en stock
    precio: 0,       // Precio del producto
  };

  productos: Producto[] = [];  // Lista de productos que se usan en el buscador
  filteredProductos: Producto[] = [];  // Productos filtrados en base a la búsqueda
  sucursales: Sucursal[] = [];  // Lista de sucursales
  searchTerm: string = '';  // Término de búsqueda para el producto

  selectedProductoNombre: string = '';  // Variable para almacenar el nombre del producto seleccionado

  constructor(
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.fetchProductos();
    this.fetchSucursales();
  }

  fetchProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  fetchSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  searchProductos(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProductos = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(term)  // Filtramos por nombre
    );
  }

  selectProducto(producto: Producto): void {
    this.stock.idProducto = producto.id_producto;
    this.stock.precio = producto.precio_unitario;  // Seleccionamos el precio del producto
    this.selectedProductoNombre = producto.nombre;  // Mostramos el nombre en la variable
    this.searchTerm = producto.nombre;  // Mostramos el nombre en el campo de búsqueda
    this.filteredProductos = [];  // Limpiamos las sugerencias
  }

  saveStock(): void {
    // Validar que todos los campos sean correctos antes de enviarlos
    if (this.isValidStock()) {
      // Preparar los datos para enviar
      const stockData: Stock = {
        idProducto: Number(this.stock.idProducto),
        idSucursal: Number(this.stock.idSucursal),
        cantidad: Number(this.stock.cantidad),
        precio: Number(this.stock.precio)
      };
  
      // Verificar que las conversiones sean válidas
      if (isNaN(stockData.idProducto) || isNaN(stockData.precio) || isNaN(stockData.cantidad) || isNaN(stockData.idSucursal)) {
        Swal.fire('Error', 'Por favor, asegúrate de que todos los campos sean números válidos.', 'error');
        return;
      }
  
      // Enviar los datos al backend
      this.stockService.saveStock(stockData).subscribe({
        next: (response: any) => { // Asegúrate de que la respuesta esté tipada correctamente
          // Si el backend devuelve un campo "message"
          const message = response?.message || 'Stock guardado exitosamente';
          Swal.fire('Éxito', message, 'success');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al guardar el stock:', err);
          // Verificar si el backend envía un mensaje de error
          const errorMessage = err?.error?.message || 'Hubo un error al guardar el stock. Intenta nuevamente.';
          Swal.fire('Error', errorMessage, 'error');
        }
      });
    } else {
      Swal.fire('Advertencia', 'Por favor, completa todos los campos correctamente.', 'warning');
    }
  }
    
  
  
  
  

  isValidStock(): boolean {
    return (
      !!this.stock.idProducto &&  // Verifica que el ID del producto esté presente
      this.stock.idSucursal > 0 &&  // Verifica que el ID de la sucursal sea válido
      this.stock.cantidad > 0 &&  // Verifica que la cantidad sea mayor a 0
      this.stock.precio > 0  // Verifica que el precio sea mayor a 0
    );
  }

  resetForm(): void {
    this.stock = {
      idProducto: 0,    // Reinicia el ID del producto como string vacío
      idSucursal: 0,     // Reinicia el ID de la sucursal
      cantidad: 0,       // Reinicia la cantidad
      precio: 0,         // Reinicia el precio
    };
    this.searchTerm = '';
    this.selectedProductoNombre = '';  // Reseteamos el nombre seleccionado
    this.filteredProductos = [];
  }
}
