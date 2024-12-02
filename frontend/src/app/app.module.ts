import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { SucursalFormComponent } from './sucursales-form/sucursales-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SucursalesListComponent } from './sucursales-list/sucursales-list.component';
import { StockService } from './stock.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import { StockManyComponent } from './stock-many/stock-many.component'; // Para formularios basados en plantilla

@NgModule({
  declarations: [
    AppComponent,
    ProductoListComponent,
    ProductoFormComponent,
    ProductoDetailComponent,
    StockListComponent, 
    StockFormComponent,
    SucursalFormComponent,
    SucursalesListComponent,
    StockManyComponent,  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule, // Asegúrate de importar esto
    FormsModule, // También importa FormsModule si usas [(ngModel)]
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }