package com.lucasxyz.gestioncancha.Entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Timbrado")
public class Timbrado {

    @Id
    private int idTimbrado;

    @ManyToOne
    private Sucursal sucursal;

    private String numeroTimbrado;
    
    private Date fechaInicio;
    
    private Date fechaFin;

    public int getIdTimbrado() {
        return idTimbrado;
    }

    public void setIdTimbrado(int idTimbrado) {
        this.idTimbrado = idTimbrado;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public String getNumeroTimbrado() {
        return numeroTimbrado;
    }

    public void setNumeroTimbrado(String numeroTimbrado) {
        this.numeroTimbrado = numeroTimbrado;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }


    
}