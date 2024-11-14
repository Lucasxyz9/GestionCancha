import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Aplicación';  // Definir la propiedad 'title'

  producto = {
    nombre: '',
    precio: null,
    tipo: '',
    cantidad: null,

  };

  guardarProducto() {
    console.log("Producto guardado:", this.producto);
    // Aquí podrías llamar a un servicio para guardar el producto en tu backend
  }
  
}
