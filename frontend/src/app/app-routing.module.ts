import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockManyComponent } from './stock-many/stock-many.component';
import { SucursalFormComponent } from './sucursales-form/sucursales-form.component';
import { SucursalesListComponent } from './sucursales-list/sucursales-list.component';
import { VentasComponent } from './ventas/ventas.component';
import { VideoayudaComponent } from './videoayuda/videoayuda.component';
import { ClienteFormComponent } from './clientes-form/clientes-form.component';

const routes: Routes = [
  // Redirige a productos por defecto
  { path: '', redirectTo: '/productos', pathMatch: 'full' },



  // Rutas de productos
  { path: 'productos', component: ProductoListComponent },
  { path: 'productos/crear', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent },
  { path: 'productos/detalle/:id', component: ProductoDetailComponent },

  // Rutas de stocks
  { path: 'stocks', component: StockListComponent },
  { path: 'stocks/new', component: StockFormComponent },
  { path: 'stocks/edit/:id', component: StockFormComponent },
  { path: 'stocks/muchos', component: StockManyComponent },

  // Ruta de sucursales
  { path: 'sucursales/list', component: SucursalesListComponent },
  { path: 'sucursales/form', component: SucursalFormComponent },

  // Ruta de ventas
  { path: 'ventas', component: VentasComponent }, // Ruta para VentasComponent

  //ruta para ayuda didactica
  { path: 'ayuda', component: VideoayudaComponent },

    //Rutas de clientes
  { path: 'cliente/crear', component: ClienteFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
