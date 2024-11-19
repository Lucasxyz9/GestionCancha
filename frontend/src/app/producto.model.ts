export interface Producto {
  cantidadMinima: number;
  id_producto: number;
  nombre: string;
  precio_unitario: number;
  tipo: string;
  cantidad_disponible: number;
}

export interface EstadoProducto extends Producto {
  editing: boolean;
  selected: boolean;
  cantidad_minima: number;  

}
