export interface Cancha {
  idCancha: number;  // Esto es opcional, ya que solo es necesario al actualizar una cancha
  nombre: string;
  ubicacion: string;
  estado: string;
  idSucursal: number; // Si tu backend espera idSucursal como número
  sucursal?: { idSucursal: number }; // Esto solo si tu backend espera un objeto
}
