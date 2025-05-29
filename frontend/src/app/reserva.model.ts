export interface Reserva {
  idReserva?: number;  // Opcional, porque al crear no se tiene todavía
  fecha: string;
  horaInicio: string;
  horaFin: string;
  cancha: {
    idCancha: number;
  };
  cliente: {
    idCliente: number;
    nombre: string;
    apellido: string;
  };
  usuario: {
    idUsuario: number;
  };
  empresa: {
    idEmpresa: number;
  };

  // Campos opcionales
  reclamos?: string;
  sanciones?: string;
  indumentaria?: string;
}
