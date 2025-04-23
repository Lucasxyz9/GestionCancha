import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; // Añadido
import { MatInputModule } from '@angular/material/input'; // Añadido
import { MatFormFieldModule } from '@angular/material/form-field'; // Añadido
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Necesario para el datepicker

import { MatDatepickerModule } from '@angular/material/datepicker';
// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Componentes propios
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockManyComponent } from './stock-many/stock-many.component';
import { SucursalFormComponent } from './sucursales-form/sucursales-form.component';
import { SucursalesListComponent } from './sucursales-list/sucursales-list.component';
import { ClienteFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CanchaComponent } from './cancha/cancha.component';
import { VentasComponent } from './ventas/ventas.component';
import { VideoayudaComponent } from './videoayuda/videoayuda.component';

// Servicios
import { StockService } from './stock.service';
import { RouterModule } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';

// Registrar localización española
registerLocaleData(localeEs);

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
    UserFormComponent,
    CanchaComponent,
    ReservasComponent,
    ReservaModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    // Material
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule, // Añadido
    MatInputModule,  // Añadido
    MatFormFieldModule, // Añadido
    MatDatepickerModule,
    MatInputModule,
    NgxMaterialTimepickerModule,  // Asegúrate de agregar esto
    

    
    // Calendario
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
