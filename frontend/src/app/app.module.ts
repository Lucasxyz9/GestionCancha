import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ReactiveFormsModule } from '@angular/forms'; // Correctly imported
import { FormsModule } from '@angular/forms'; // Removed duplicate import
import { StockManyComponent } from './stock-many/stock-many.component'; // For template-driven forms

// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'; // Added MatButtonModule
import { VentasComponent } from './ventas/ventas.component';
import { VideoayudaComponent } from './videoayuda/videoayuda.component';
import { ClienteFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';

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
    StockManyComponent,
    VentasComponent,
    VideoayudaComponent,
    ClienteFormComponent,
    ClientesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule, // Ensure it's correctly imported
    MatTableModule, // Angular Material modules
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule, // Added MatButtonModule
    BrowserAnimationsModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
