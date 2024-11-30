export interface Sucursal {
  idSucursal: number;
  nombre: string;
  ubicacion: string;
  timbrado: string;
}
export interface EstadoSucursal extends Sucursal {
  editing: boolean;  // Indica si la sucursal está en modo edición
  selected: boolean; // Indica si la sucursal está seleccionada para alguna acción
}