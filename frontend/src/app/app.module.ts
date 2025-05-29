import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material modules
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
//Timepicker NGX
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

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
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';

// Servicios
import { StockService } from './stock.service';
import { RouterModule } from '@angular/router';
import { CourtAvailabilityComponent } from './court-availability/court-availability.component';
import { ReservaDetalleModalComponent } from './reserva-detalle-modal/reserva-detalle-modal.component';

// Registrar localización española
registerLocaleData(localeEs);

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Esto permite componentes web personalizados
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
    CourtAvailabilityComponent,
    ReservaDetalleModalComponent  

  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // Angular Material Modules
    MatAutocompleteModule,
    MatCheckboxModule,

    MatSelectModule,  // <-- Aquí agregas el módulo
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],  
  providers: [
    StockService, 
    provideHttpClient(withInterceptorsFromDi()),
    { provide: MAT_DATE_LOCALE, useValue: 'es' } // Asegúrate de que esta línea esté aquí para configurar el locale español
  ]
})
export class AppModule { }
