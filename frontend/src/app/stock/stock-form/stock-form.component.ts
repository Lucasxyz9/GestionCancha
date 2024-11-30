import { Component, OnInit } from '@angular/core';
import { StockService } from './../../stock.service';
import { Stock } from './../../stock.model';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/producto.service';
import { Sucursal } from 'src/app/sucursal.model';
import { SucursalService } from 'src/app/sucursales.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Stock = {
    productoId: 0,   // Solo se envía el ID del producto
    sucursal: { idSucursal: 0 }, // Se define como un objeto con el ID de la sucursal
    cantidad: 0,      // Cantidad en stock
    precio: 0,        // Precio del producto
  };

  productos: Producto[] = [];  // Lista de productos que se usan en el buscador
  filteredProductos: Producto[] = [];  // Productos filtrados en base a la búsqueda
  sucursales: Sucursal[] = [];  // Lista de sucursales
  searchTerm: string = '';  // Término de búsqueda para el producto

  // Variable para almacenar el nombre del producto seleccionado (temporal)
  selectedProductoNombre: string = ''; 

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
    this.stock.productoId = producto.id_producto; // Seleccionamos el ID del producto
    this.stock.precio = producto.precio_unitario;  // Seleccionamos el precio del producto
    this.selectedProductoNombre = producto.nombre;  // Mostramos el nombre en la variable
    this.searchTerm = producto.nombre;  // Mostramos el nombre en el campo de búsqueda
    this.filteredProductos = [];  // Limpiamos las sugerencias
  }

  saveStock(): void {
    // Validación de stock antes de enviarlo
    if (this.isValidStock()) {
      this.stockService.saveStock(this.stock).subscribe({
        next: () => {
          alert('Stock guardado correctamente');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al guardar el stock:', err);
          alert('Error al guardar el stock.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  isValidStock(): boolean {
    return (
      !!this.stock.productoId && 
      this.stock.sucursal.idSucursal > 0 && 
      this.stock.cantidad > 0 &&
      this.stock.precio > 0
    );
  }

  resetForm(): void {
    this.stock = {
      productoId: 0,
      sucursal: { idSucursal: 0 }, // Reiniciamos la sucursal como un objeto vacío
      cantidad: 0,
      precio: 0,
    };
    this.searchTerm = '';
    this.selectedProductoNombre = ''; // Reseteamos el nombre seleccionado
    this.filteredProductos = [];
  }
}
