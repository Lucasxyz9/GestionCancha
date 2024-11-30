export interface Movimiento {
    id?: number;
    tipo: string; // 'Entrada' o 'Salida'
    cantidad: number;
    productoId: number;
    sucursalId: number;
    fecha?: string;
    comentarios?: string;   // Notas adicionales
    sucursal_destino?: string; // Opcional para transferencias
    sucursal_origen?: string; // Opcional para transferencias
    producto: string;

  }