package com.lucasxyz.gestioncancha.Entities;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;

public class Cancha {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCancha;

    private String nombre;
    private String ubicacion;
    private String tipo;
    private BigDecimal precioPorHora;
    private String estado;

    @OneToMany(mappedBy = "cancha")
    private List<Reserva> reservas;

    public Integer getIdCancha() {
        return idCancha;
    }

    public void setIdCancha(Integer idCancha) {
        this.idCancha = idCancha;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getPrecioPorHora() {
        return precioPorHora;
    }

    public void setPrecioPorHora(BigDecimal precioPorHora) {
        this.precioPorHora = precioPorHora;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    // Getters y setters
    

}
