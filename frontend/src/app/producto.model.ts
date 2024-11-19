export interface Producto {
  id_producto: number;
  nombre: string;
  precio_unitario: number;
  cantidad_disponible: number;
  tipo: string;
  // Elimina la propiedad 'some', ya que no es necesaria en el modelo
}

export interface EstadoProducto extends Producto {
  editing: boolean;
  selected: boolean;
}
