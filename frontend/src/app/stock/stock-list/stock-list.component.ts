import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockList } from '../../stock-list.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: StockList[] = []; // Lista de stocks
  originalStocks: StockList[] = []; // Copia para restaurar el orden original
  sortBySucursal: boolean = false; // Controla si se ordena por sucursal

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  // Cargar stocks desde el backend
  loadStocks(): void {
    this.http.get<StockList[]>('http://localhost:8080/api/stock')
      .subscribe(
        (data) => {
          console.log('Datos recibidos:', data);  // Verifica si los datos contienen id_stock
          this.stocks = data;
        },
        (error) => {
          console.error('Error al cargar los stocks', error);
        }
      );
  }
  
  
  
  

  // Ordenar los stocks por sucursal
  sortStocks(): void {
    if (this.sortBySucursal) {
      this.stocks.sort((a, b) => a.sucursal.nombre.localeCompare(b.sucursal.nombre));
    } else {
      this.stocks = [...this.originalStocks];
    }
  }

  // Eliminar un stock por ID
  deleteStock(stock: StockList): void {
    const stockId = stock.idStock;  // Usa 'idStock' en lugar de 'id_stock'
    if (stockId === undefined || stockId === null) {
      console.error('ID de stock no válido');
      return;
    }
    console.log(`ID de stock enviado al backend: ${stockId}`);
    
    this.http.delete(`http://localhost:8080/api/stock/${stockId}`)
      .subscribe(
        () => {
          this.stocks = this.stocks.filter(s => s.idStock !== stockId);  // Usa 'idStock' en lugar de 'id_stock'
        },
        (error) => {
          console.error('Error al eliminar el stock:', error);
        }
      );
  }
  

  
   
}
