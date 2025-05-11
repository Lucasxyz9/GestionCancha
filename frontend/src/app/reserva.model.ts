
export interface Reserva {
  idReserva?: number;  // Usamos ? para indicar que puede ser opcional, ya que puede no estar disponible al crearla
  fecha: string;
  horaInicio: string;
  horaFin: string;
  cancha: {
    idCancha: number;
  };
  cliente: {
    idCliente: number;
    nombre: string;
    apellido : string;
  };
  usuario: {
    idUsuario: number;
  };
  empresa: {
    idEmpresa: number;
  };
}
