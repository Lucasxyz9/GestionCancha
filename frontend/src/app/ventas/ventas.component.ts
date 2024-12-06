  import { Component, OnInit } from '@angular/core';
  import { ProductoService } from '../producto.service';
  import { SucursalService } from '../sucursales.service'; // Servicio de sucursales
  import { Producto } from '../producto.model';
  import { Sucursal } from '../sucursal.model'; // Modelo de sucursal
  import { VentaService, RegistroVenta } from '../ventas.service'; // Importa VentaService
  import Swal from 'sweetalert2';


  @Component({
    selector: 'app-ventas',
    templateUrl: './ventas.component.html',
    styleUrls: ['./ventas.component.css'],
  })
  
  export class VentasComponent implements OnInit {
    productos: Producto[] = [];
    productosFiltrados: Producto[] = [];
    carrito: { producto: Producto; cantidad: number }[] = [];
    total: number = 0;

    busqueda: string = '';
    sucursales: Sucursal[] = [];
    sucursalSeleccionada: number | null = null;

    constructor(
      private productoService: ProductoService,
      private sucursalService: SucursalService,
      private ventaService: VentaService // Inyecta el servicio de ventas
    ) {}

    ngOnInit(): void {
      this.cargarSucursales();
    }

    cargarSucursales(): void {
      this.sucursalService.getSucursales().subscribe({
        next: (data) => {
          this.sucursales = data;
          if (data.length > 0) {
            this.sucursalSeleccionada = data[0].id; // Seleccionar la primera sucursal por defecto
            this.cargarProductos();
          }
        },
        error: (err) => console.error('Error al cargar sucursales', err),
      });
    }

    cargarProductos(): void {
      if (!this.sucursalSeleccionada) {
        console.error('Sucursal no seleccionada');
        return;
      }
      this.productoService.getProductosPorSucursal(this.sucursalSeleccionada).subscribe({
        next: (data) => {
          console.log('Productos cargados:', data);  // Depuración
          this.productos = data;
          this.filtrarProductos(); // Inicializa el filtro con la lista completa
        },
        error: (err) => {
          console.error('Error al cargar productos', err);
          alert('Hubo un error al cargar los productos.');
        },
      });
    }

    filtrarProductos(): void {
      const texto = this.busqueda.toLowerCase();
      this.productosFiltrados = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(texto)
      );
    }

    seleccionarProducto(producto: Producto): void {
      const itemEnCarrito = this.carrito.find((item) => item.producto.id_producto === producto.id_producto);
      if (itemEnCarrito) {
        this.modificarCantidad(itemEnCarrito, 1); // Incrementar cantidad
      } else {
        this.carrito.push({ producto, cantidad: 1 });
      }
      this.calcularTotal();
    }

    modificarCantidad(item: { producto: Producto; cantidad: number }, cantidad: number): void {
      item.cantidad += cantidad;
      if (item.cantidad <= 0) {
        this.eliminarProducto(item);
      }
      this.calcularTotal();
    }

    eliminarProducto(item: { producto: Producto; cantidad: number }): void {
      this.carrito = this.carrito.filter((i) => i !== item);
      this.calcularTotal();
    }

    calcularTotal(): void {
      this.total = this.carrito.reduce(
        (sum, item) => sum + item.producto.precio_unitario * item.cantidad,
        0
      );
    }

    finalizarVenta(): void {
      if (!this.sucursalSeleccionada) {
        console.error('No se ha seleccionado una sucursal.');
        return;
      }
    
      const venta: RegistroVenta = {
        idSucursal: this.sucursalSeleccionada,
        cajaId: 1, // Este valor debería ser dinámico
        productos: this.carrito.map(item => ({
          id_producto: item.producto.id_producto,
          cantidad: item.cantidad
        })),
        total: this.total
      };
    
      this.ventaService.registrarVenta(venta).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            console.log(response.message);
    
            // Limpiar carrito y recalcular total
            this.carrito = [];
            this.calcularTotal();
    
            // Mostrar SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: 'Venta Finalizada',
              text: response.message,
              confirmButtonText: 'Aceptar'
            });
          } else {
            console.error('Error en la respuesta:', response.message);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
              confirmButtonText: 'Cerrar'
            });
          }
        },
        error: (err) => {
          console.error('Error al registrar la venta:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al procesar la venta.',
            confirmButtonText: 'Cerrar'
          });
        }
      });
    }
     
    
    
    
  }
