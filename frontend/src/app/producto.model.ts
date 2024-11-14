export interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  tipo: string;
  cantidad: number;
}
export interface EstadoProducto extends Producto {
  editing: boolean;
  selected: boolean;
}
