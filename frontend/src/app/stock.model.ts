export interface Stock {
  idStock?: number;  // Esto es opcional ya que el backend lo genera automáticamente.
  idSucursal: number;  // El ID de la sucursal.
  idProducto: number;  // El ID del producto.
  cantidad: number;  // La cantidad en stock.
  precio: number;  // El precio del producto en stock.
  nombre?: string;  // El nombre del producto (opcional si el backend lo sincroniza automáticamente).
}
