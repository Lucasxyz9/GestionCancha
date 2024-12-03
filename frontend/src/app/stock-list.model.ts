export interface StockList {
  idStock: number;  // Identificador único del stock
  producto: {
    id_producto: number;  // Identificador único del producto
    nombre: string;       // Nombre del producto
  };
  cantidad: number;      // Cantidad disponible del producto en stock
  sucursal: {
    id_sucursal: number; // Identificador único de la sucursal
    nombre: string;      // Nombre de la sucursal
  };
  precio: number;        // Precio del producto en el stock
}

  