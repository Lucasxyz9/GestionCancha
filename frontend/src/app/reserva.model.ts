export interface Reserva {
  idReserva?: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  canchaId: number;
  clienteId: number;
  usuarioId: number;
  empresaId: number;
  estado?: string;
  sucursalId: number; 
}