import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockList } from '../../stock-list.model';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: StockList[] = []; // Lista para paginar y mostrar
  originalStocks: StockList[] = []; // Lista original sin ordenar
  sortBySucursal: boolean = true; // Por defecto, ordenamos por sucursal
  displayedColumns: string[] = ['producto', 'sucursal', 'cantidad', 'precio', 'acciones'];

  totalRecords: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.http.get<StockList[]>('http://localhost:8080/api/stock')
      .subscribe(
        (data) => {
          console.log('Datos recibidos:', data);
          this.originalStocks = [...data]; // Guardar los datos originales sin modificar
          this.stocks = [...data]; // Establecer los datos iniciales
          this.totalRecords = data.length;
          this.sortStocks(); // Ordenar por sucursal al cargar
          this.loadPageData(); // Cargar los datos de la página actual
        },
        (error) => {
          console.error('Error al cargar los stocks', error);
        }
      );
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadPageData(); // Recargar los datos de la página seleccionada
  }

  loadPageData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.stocks = this.getSortedStocks().slice(startIndex, endIndex); // Paginación de los datos ordenados
  }

  getSortedStocks(): StockList[] {
    // Devuelve la lista ordenada, si es necesario
    if (this.sortBySucursal) {
      return [...this.originalStocks].sort((a, b) => a.sucursal.nombre.localeCompare(b.sucursal.nombre));
    }
    return [...this.originalStocks];
  }

  sortStocks(): void {
    // Solo ordena la lista temporalmente y actualiza la paginación
    this.stocks = this.getSortedStocks();
    this.loadPageData(); // Actualiza la página después de ordenar
  }

  deleteStock(stock: StockList): void {
    const stockId = stock.idStock;
    if (stockId === undefined || stockId === null) {
      console.error('ID de stock no válido');
      Swal.fire("Error", "El ID de stock no es válido.", "error");
      return;
    }
  
    Swal.fire({
      title: "¿Está seguro de que desea eliminar este stock?",
      text: `ID de Stock: ${stockId}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`ID de stock enviado al backend: ${stockId}`);
        
        this.http.delete(`http://localhost:8080/api/stock/${stockId}`).subscribe(
          () => {
            // Eliminar el stock de la lista original y de los stocks visibles
            this.originalStocks = this.originalStocks.filter(s => s.idStock !== stockId);
            this.stocks = this.getSortedStocks().slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize); // Actualizar stocks visibles
            this.totalRecords = this.originalStocks.length; // Actualizar el total de registros
            this.loadPageData(); // Recargar los datos de la página después de eliminar
            Swal.fire("¡Eliminado!", "El stock ha sido eliminado exitosamente.", "success");
          },
          (error) => {
            console.error('Error al eliminar el stock:', error);
            Swal.fire("Error", "No se pudo eliminar el stock. Intente de nuevo más tarde.", "error");
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "La operación fue cancelada.", "info");
      }
    });
  }
  
}
