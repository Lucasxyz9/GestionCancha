import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockList } from '../../stock-list.model';  // Asegúrate de importar el modelo actualizado

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: StockList[] = [];  // Usamos el modelo StockList actualizado

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.http.get<StockList[]>('http://localhost:8080/api/stock')
      .subscribe(
        (data) => {
          console.log('Datos recibidos:', data);  // Agregar esto para ver la respuesta
          this.stocks = data;
        },
        (error) => {
          console.error('Error al cargar los stocks', error);
        }
      );
  }
}
