export interface Reserva {
  idReserva?: number;  // Opcional para cuando se crea nueva reserva
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

  // Nuevos campos opcionales
  reclamos?: string;
  sanciones?: string;
  indumentaria?: string;
}
