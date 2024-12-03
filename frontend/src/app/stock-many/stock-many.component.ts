import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock.model';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/producto.service';
import { Sucursal } from 'src/app/sucursal.model';
import { SucursalService } from 'src/app/sucursales.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-many',
  templateUrl: './stock-many.component.html',
  styleUrls: ['./stock-many.component.css']
})
export class StockManyComponent implements OnInit {
  stockForm: FormGroup; // Formulario reactivo
  stocks: Stock[] = []; // Lista de stocks
  productos: Producto[] = []; // Lista completa de productos
  filteredProductos: Producto[] = []; // Lista de productos filtrados
  sucursales: Sucursal[] = []; // Lista de sucursales
  searchTerm: string = ''; // Término de búsqueda para productos

  constructor(
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    private stockService: StockService,
    private fb: FormBuilder // Inyección de FormBuilder para formularios reactivos
  ) {
    // Inicialización del formulario reactivo
    this.stockForm = this.fb.group({
      stocks: this.fb.array([this.createStock()]) // FormArray inicial con una fila
    });
  }

  ngOnInit(): void {
    this.fetchProductos();
    this.fetchSucursales();
    this.fetchStocks(); // Cargar lista inicial de stocks
  }

  // Crear una nueva fila de stock en el FormArray
  createStock(): FormGroup {
    return this.fb.group({
      nombreProducto: ['', Validators.required],  // Usamos nombreProducto en lugar de idProducto
      idSucursal: [0, Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      idProducto: [0, Validators.required]  // Asegúrate de agregar idProducto aquí
    });
  }

  // Acceso al FormArray del formulario
  get stocksFormArray(): FormArray {
    return this.stockForm.get('stocks') as FormArray;
  }

  // Agregar una nueva fila de stock
  addStockRow(): void {
    this.stocksFormArray.push(this.createStock());
  }

  // Eliminar una fila de stock
  removeStockRow(index: number): void {
    if (this.stocksFormArray.length > 1) {
      this.stocksFormArray.removeAt(index);
    }
  }

  // Obtener la lista completa de productos
  fetchProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  // Obtener la lista completa de sucursales
  fetchSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  // Obtener la lista inicial de stocks
  fetchStocks(): void {
    this.stockService.getAllStocks().subscribe((data) => {
      this.stocks = data;
    });
  }

  // Filtrar productos en base al término de búsqueda
  searchProductos(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProductos = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(term)
    );
  }

  // Manejar la selección de un producto y asignar precio automáticamente
  selectProducto(event: any, index: number) {
  const selectedProductName = event.target.value;
  
  // Buscar el producto por el nombre
  const selectedProduct = this.filteredProductos.find(product => product.nombre === selectedProductName);
  
  // Si se encuentra el producto, asignar tanto la ID como el precio al formulario
    if (selectedProduct) {
      // Asignar la ID del producto seleccionado al formulario
      this.stocksFormArray.at(index).get('idProducto')?.setValue(selectedProduct.id_producto);
      
      // Asignar el precio del producto al formulario
      this.stocksFormArray.at(index).get('precio')?.setValue(selectedProduct.precio_unitario);
    }
  }

  // Obtener el nombre del producto para mostrar en el input
  getProductoNombre(index: number): string {
  const idProducto = this.stocksFormArray.at(index).get('idProducto')?.value;
  const producto = this.productos.find(p => p.id_producto === idProducto);
  return producto ? producto.nombre : '';
  }
  

  // Manejar el envío del formulario
  // Agregar la validación antes de enviar
  onSubmit(): void {
    const validStocks = this.stocksFormArray.controls.filter(control => {
      return control.get('nombreProducto')?.value &&
             control.get('idSucursal')?.value &&
             control.get('cantidad')?.value > 0 &&
             control.get('precio')?.value > 0;
    });
  
    // Verificar si hay filas válidas
    if (validStocks.length === 0) {
      alert('Por favor, complete al menos una fila válida.');
      return;
    }
  
    // Preparar los datos de stock de acuerdo a la estructura que espera el backend
    const stockData: Stock[] = validStocks.map(control => {
      return {
        idProducto: control.get('idProducto')?.value,
        idSucursal: control.get('idSucursal')?.value,
        cantidad: control.get('cantidad')?.value,
        precio: control.get('precio')?.value,
        nombre: control.get('nombreProducto')?.value,
        producto: { id_producto: control.get('idProducto')?.value },
        sucursal: { idSucursal: control.get('idSucursal')?.value }
      };
    });
  
    // Enviar los datos al backend y manejar la respuesta
    this.stockService.saveStocks(stockData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert('Stocks guardados correctamente');
          this.resetForm(); // Reiniciar el formulario
        } else {
          alert('Error al guardar los stocks.');
        }
      },
      error: (err) => {
        console.error('Error al guardar los stocks:', err);
        alert('Error al guardar los stocks.');
      }
    });
  }
  


  // Reiniciar el formulario a su estado inicial
  resetForm(): void {
    this.stockForm.reset();
    this.stocksFormArray.clear();
    this.addStockRow(); // Agregar una fila vacía después de reiniciar
  }
}
