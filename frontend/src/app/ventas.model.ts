export interface ventas {
    idSucursal: number;
    idCliente: number;
    monto: number;
    fecha: string; // O `Date` si prefieres manejar objetos fecha
    detalles: { productoId: number; cantidad: number }[];
  }
  