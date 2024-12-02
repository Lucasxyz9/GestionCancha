import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-many',
  templateUrl: './stock-many.component.html',
  styleUrls: ['./stock-many.component.css']
})
export class StockManyComponent implements OnInit {
  stockForm: FormGroup;
  sucursales: any[] = []; // Asegúrate de que 'sucursales' se llena con los datos reales
  stockData: any; // Variable para almacenar los datos de stock enviados

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Inicializa el formulario con un FormArray vacío
    this.stockForm = this.fb.group({
      stocks: this.fb.array([]) // Contenedor para los múltiples registros de Stock
    });
  }

  ngOnInit(): void {
    this.addStockRows(1); // Agrega 1 fila por defecto al inicio
    // Aquí podrías llamar un servicio para obtener las sucursales, por ejemplo
    // this.loadSucursales();
  }

  // Getter para acceder al FormArray de stocks
  get stocks(): FormArray {
    return this.stockForm.get('stocks') as FormArray;
  }

  // Método para agregar una nueva fila de Stock
  addStockRow(): void {
    const stockGroup = this.fb.group({
      idProducto: [null, [Validators.required, Validators.min(1)]],  // Validar que sea un número positivo
      nombre: ['', Validators.required],  // Nombre del producto
      sucursalId: [null, [Validators.required, Validators.min(1)]],  // ID de la sucursal
      cantidad: [null, [Validators.required, Validators.min(1)]],  // Cantidad debe ser mayor que 0
      precio: [null, [Validators.required, Validators.min(0.01)]]  // Precio debe ser positivo
    });

    this.stocks.push(stockGroup);
  }

  // Método para agregar múltiples filas (por ejemplo, 10 filas)
  addStockRows(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addStockRow();
    }
  }

  // Método para manejar el envío del formulario (solo inserción)
  onSubmit(): void {
    if (this.stockForm.valid) {
      const stockData = this.stockForm.value.stocks;
      console.log('Datos enviados:', stockData);

      // Enviar al backend (ajusta la URL a tu API real)
      this.http.post('http://localhost:8080/api/stocks', stockData).subscribe(
        response => {
          console.log('Stocks insertados correctamente', response);
          this.stockData = response;  // Almacena la respuesta en stockData
          alert('Stocks insertados correctamente');
          this.stockForm.reset(); // Opcional: reinicia el formulario después de enviar
        },
        error => {
          console.error('Error al insertar stocks', error);
          alert('Error al insertar los stocks. Por favor, intente nuevamente.');
        }
      );
    } else {
      console.error('Formulario inválido');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  // Método para eliminar una fila de stock (si es necesario)
  removeStockRow(index: number): void {
    this.stocks.removeAt(index);
  }

  // Método para cargar las sucursales
  loadSucursales(): void {
    // Llamar un servicio para obtener las sucursales
    this.http.get<any[]>('http://localhost:8080/api/sucursales').subscribe(
      data => {
        this.sucursales = data;
      },
      error => {
        console.error('Error al cargar las sucursales', error);
      }
    );
  }
}
