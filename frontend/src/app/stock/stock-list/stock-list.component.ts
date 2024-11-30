import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';
import { Router } from '@angular/router';
import { SUCURSALES } from 'src/app/shared/sucursales-lista';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];
  sucursales = SUCURSALES;

  constructor(private stockService: StockService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  

  editStock(stock: any): void {
    this.router.navigate(['/stock/edit', stock.id]);
  }

  

  navigateToForm(): void {
    this.router.navigate(['/stock/create']);
  }

  getSucursalName(sucursalId: number): string {
    const sucursal = this.sucursales.find((s) => s.id === sucursalId);
    return sucursal ? sucursal.nombre : 'Sucursal desconocida';
  }
}
