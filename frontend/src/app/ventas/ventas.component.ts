import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { SucursalService } from '../sucursales.service'; // Servicio de sucursales
import { Producto } from '../producto.model';
import { Sucursal } from '../sucursal.model'; // Modelo de sucursal
import { VentaService, RegistroVenta } from '../ventas.service'; // Importa VentaService
import Swal from 'sweetalert2';
import { Caja } from '../Caja.model';
import { ClienteService } from '../cliente.service'; // Importa ClienteService
import { ventas } from '../ventas.model';
import { clientes } from '../clientes.model';

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

  ciBusqueda: string = '';
  rucBusqueda: string = '';
  clienteSeleccionado: { id: number; nombre: string ;apellido:string,ci:string,ruc:string } | null = null;

  constructor(
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    private ventaService: VentaService, // Inyecta el servicio de ventas
    private clienteService: ClienteService, // Inyecta el servicio de clientes
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
        console.log('Productos cargados:', data); // Depuración
        this.productos = data;
        this.filtrarProductos(); // Inicializa el filtro con la lista completa
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cargar los productos.',
        });
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
      productos: this.carrito.map((item) => ({
        id_producto: item.producto.id_producto,
        cantidad: item.cantidad,
      })),
      total: this.total,
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
            confirmButtonText: 'Aceptar',
          });
        } else {
          console.error('Error en la respuesta:', response.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message,
            confirmButtonText: 'Cerrar',
          });
        }
      },
      error: (err) => {
        console.error('Error al registrar la venta:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la venta.',
          confirmButtonText: 'Cerrar',
        });
      },
    });
  }

  insertarClienteACaja(ci: string, ruc: string): void {
    this.clienteService.buscarCliente(ci, ruc).subscribe({
      next: (cliente) => {
        if (cliente) {
          const venta: ventas = {
            idCliente: cliente.idCliente,
            idSucursal: this.sucursalSeleccionada ?? 0,
            monto: this.total,
            fecha: new Date().toISOString(),
            detalles: []
          };
  
          // Usa ventaService para registrar al cliente en la caja
          this.ventaService.asociarClienteACaja(venta).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Cliente Agregado',
                text: 'El cliente se ha asociado a la caja correctamente.',
                confirmButtonText: 'Aceptar',
              });
            },
            error: (err) => {
              console.error('Error al asociar cliente a la caja:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo asociar el cliente a la caja.',
                confirmButtonText: 'Cerrar',
              });
            },
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Cliente No Encontrado',
            text: 'No se encontró un cliente con el CI o RUC proporcionado.',
            confirmButtonText: 'Cerrar',
          });
        }
      },
      error: (err) => {
        console.error('Error al buscar cliente:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al buscar el cliente.',
          confirmButtonText: 'Cerrar',
        });
      },
    });
  }

  buscarCliente(): void {
    if (!this.ciBusqueda && !this.rucBusqueda) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Vacíos',
        text: 'Por favor ingrese CI o RUC para buscar un cliente.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    this.clienteService.buscarCliente(this.ciBusqueda, this.rucBusqueda).subscribe({
      next: (cliente: clientes | null) => {
        if (cliente) {
          // Adaptar el formato del cliente para mostrar los detalles
          this.clienteSeleccionado = {
            id: cliente.idCliente || 0, // Asegúrate de que el nombre del campo sea correcto
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            ci: cliente.ci,
            ruc: cliente.ruc || 'No disponible', // RUC es opcional
          };

          Swal.fire({
            icon: 'success',
            title: 'Cliente Encontrado',
            text: `Cliente: ${cliente.nombre} ${cliente.apellido}, CI: ${cliente.ci}, RUC: ${cliente.ruc || 'No disponible'}`,
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No Encontrado',
            text: 'No se encontró un cliente con los datos proporcionados.',
            confirmButtonText: 'Cerrar',
          });
        }
      },
      error: (err) => {
        console.error('Error al buscar cliente:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al buscar el cliente.',
          confirmButtonText: 'Cerrar',
        });
      },
    });
  }
  
  

}
  