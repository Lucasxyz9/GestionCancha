import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {
  producto: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Obtiene el ID de la URL
    if (id) {
      this.productoService.getProducto(Number(id)).subscribe((producto: Producto) => {
        this.producto = producto;  // Asigna el producto a la variable de la clase
      });
    }
  }
}
