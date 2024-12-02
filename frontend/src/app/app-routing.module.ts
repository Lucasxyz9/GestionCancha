  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';

  // Importa los componentes
  import { ProductoListComponent } from './producto-list/producto-list.component';
  import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
  import { ProductoFormComponent } from './producto-form/producto-form.component';
  import { StockFormComponent } from './stock/stock-form/stock-form.component';
  import { StockListComponent } from './stock/stock-list/stock-list.component';
import { SucursalFormComponent } from './sucursales-form/sucursales-form.component';
import { SucursalesListComponent } from './sucursales-list/sucursales-list.component';
import { StockManyComponent } from './stock-many/stock-many.component';

  const routes: Routes = [
    // Redirige a productos por defecto
    { path: '', redirectTo: '/productos', pathMatch: 'full' },  // Ruta inicial, redirige a productos

    // Rutas de productos
    { path: 'productos', component: ProductoListComponent },  // Ruta para listar productos
    { path: 'productos/crear', component: ProductoFormComponent },  // Ruta para crear un nuevo producto
    { path: 'productos/editar/:id', component: ProductoFormComponent },  // Ruta para editar un producto
    { path: 'productos/detalle/:id', component: ProductoDetailComponent },  // Ruta para ver los detalles de un producto

    // Ruta de stocks
    { path: 'stocks', component: StockListComponent }, // Ruta para la lista de stocks
    { path: 'stocks/new', component: StockFormComponent }, // Ruta para agregar un nuevo stock
    { path: 'stocks/edit/:id', component: StockFormComponent }, // Ruta para editar un stock
    { path: 'stocks/muchos', component: StockManyComponent },  // Ruta para el formulario de múltiples Stocks
    { path: 'stocks/create', component: StockManyComponent },  // Otras rutas pueden ir aquí


    //Ruta de sucursales crud
    {path:'sucursales/list', component: SucursalesListComponent},
    { path: 'sucursales/form', component: SucursalFormComponent }, // Ruta para el formulario de sucursales
    { path: '', redirectTo: '/sucursales/form', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
