package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.Entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "Cancha")
public class Cancha {
    @Id
    @GeneratedValue
    @Column(name = "id_cancha")
    private UUID idCancha;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "ubicacion", length = 100)
    private String ubicacion;

    public UUID getIdCancha() {
        return idCancha;
    }

    public void setIdCancha(UUID idCancha) {
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

    
}
