import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../sucursales.service'; 
import { EstadoSucursal, Sucursal } from '../sucursal.model';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.css']
})
export class SucursalesListComponent implements OnInit {
  sucursales: EstadoSucursal[] = [];
  todosSeleccionados: boolean = false; // Controla si todos están seleccionados

  // Método para alternar la selección de todas las sucursales
  toggleSeleccionarTodos(): void {
    this.todosSeleccionados = !this.todosSeleccionados;
    this.sucursales.forEach(sucursal => {
      sucursal.selected = this.todosSeleccionados;
    });
  }

  // Método para eliminar una sucursal
  deleteSucursal(id: number): void {
    this.sucursalService.deleteSucursal(id).subscribe(
      response => {
        console.log('Sucursal eliminada:', response);
  
        // Eliminar localmente la sucursal
        this.sucursales = this.sucursales.filter(s => s.idSucursal !== id);
      },
      error => {
        console.error('Error al eliminar la sucursal:', error);
      }
    );
  }

  // Método para eliminar todas las sucursales seleccionadas
  deleteSeleccionados(): void {
    const sucursalesSeleccionadas = this.sucursales.filter(sucursal => sucursal.selected);
    if (sucursalesSeleccionadas.length === 0) {
      alert('No hay sucursales seleccionadas para eliminar');
      return;
    }

    // Llamar al servicio para eliminar las sucursales seleccionadas
    sucursalesSeleccionadas.forEach(sucursal => {
      this.sucursalService.deleteSucursal(sucursal.idSucursal).subscribe({
        next: (response) => {
          this.sucursales = this.sucursales.filter(s => s.idSucursal !== sucursal.idSucursal);
          console.log('Sucursal eliminada:', response);
        },
        error: (error) => console.error('Error al eliminar sucursal:', error)
      });
    });
  }

  // Métodos para obtener las sucursales
  constructor(private sucursalService: SucursalService) { }

  ngOnInit(): void {
    this.sucursalService.getSucursales().subscribe(sucursales => {
      // Asegúrate de que 'id_sucursal' esté presente en cada objeto
      console.log(sucursales);  // Puedes agregar un log para verificar que el id está presente
      this.sucursales = sucursales;
    });
  }

  // Métodos de edición y actualización de sucursales
  editarSucursal(sucursal: EstadoSucursal): void {
    sucursal.editing = true;
  }

  guardarSucursal(sucursal: Sucursal): void {
    this.sucursalService.updateSucursal(sucursal.idSucursal, sucursal).subscribe(
      response => {
        console.log('Sucursal actualizada:', response);
  
        // Recargar toda la tabla
        this.cargarSucursales();
      },
      error => {
        console.error('Error al guardar la sucursal:', error);
      }
    );
  }
  
  // Método para cargar sucursales
  cargarSucursales(): void {
    this.sucursalService.getSucursales().subscribe(
      data => {
        this.sucursales = data;
      },
      error => {
        console.error('Error al cargar sucursales:', error);
      }
    );
  }
  
  
  
  
  

  cancelarEdicion(sucursal: EstadoSucursal): void {
    sucursal.editing = false;
    this.ngOnInit();
  }
}


