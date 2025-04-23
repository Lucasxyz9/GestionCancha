package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Aseguramos que el UUID se genere automáticamente
    @Column(name = "id_reserva", nullable = false, unique = true)
    private long idReserva;

    @Column(name = "fecha", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // Asegura que el formato de fecha sea consistente con LocalDateTime
    private LocalDateTime fecha;

    @Column(name = "hora_inicio", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // Formato para horaInicio
    private LocalDateTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // Formato para horaFin
    private LocalDateTime horaFin;

    @ManyToOne
    @JoinColumn(name = "cancha_id", nullable = false)
    private Cancha cancha;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    // Getters y Setters

    public long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(long id) {
        this.idReserva = id;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public LocalDateTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalDateTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalDateTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalDateTime horaFin) {
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
