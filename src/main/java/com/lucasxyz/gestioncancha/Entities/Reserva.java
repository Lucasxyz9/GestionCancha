package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue
    @Column(name = "id_reserva", nullable = false, unique = true)
    private UUID idReserva;

    @Column(name = "fecha", nullable = false)
    private Date fecha;

    @Column(name = "hora_inicio", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaInicio;

    @Column(name = "hora_fin", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaFin;

    @ManyToOne
    @JoinColumn(name = "cancha_id", nullable = false)
    private Cancha cancha;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario; // Usuario que registró la reserva

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa; // Relación con Empresa a través del Usuario

    // Getters y Setters

    public UUID getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(UUID idReserva) {
        this.idReserva = idReserva;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Date getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Date horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Date getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(Date horaFin) {
        this.horaFin = horaFin;
    }

    public Cancha getCancha() {
        return cancha;
    }

    public void setCancha(Cancha cancha) {
        this.cancha = cancha;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

}

