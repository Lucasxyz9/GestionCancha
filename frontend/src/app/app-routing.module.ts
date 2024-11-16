import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },  // Redirige por defecto a la lista de productos
  { path: 'productos', component: ProductoListComponent },  // Ruta para listar productos
  { path: 'productos/crear', component: ProductoFormComponent },  // Ruta para crear un nuevo producto
  { path: 'productos/editar/:id', component: ProductoFormComponent },  // Ruta para editar un producto
  { path: 'productos/detalle/:id', component: ProductoDetailComponent },  // Ruta para ver los detalles de un producto
  { path: '**', redirectTo: '/productos' }  // Redirige a la lista de productos en caso de una ruta no válida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
