export interface Producto {
  id_producto: number;
  nombre: string;
  precio_unitario: number;  // Esta es la propiedad que estás utilizando
  cantidad_disponible: number;  // Esta es la propiedad que estás utilizando
  tipo: string;
}
export interface EstadoProducto extends Producto {
  editing: boolean;
  selected: boolean;
}
