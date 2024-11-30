export interface Stock {
  productoId: number; // Asegúrate de que el nombre coincide con el backend
  sucursal: {
    idSucursal: number;
  };
  cantidad: number;
  precio: number;
}