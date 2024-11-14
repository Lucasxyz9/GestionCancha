package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Sucursal")
public class Sucursal {

    @Id
    private int idSucursal;
    
    private String nombre;
    
    private String ubicacion;
    
    private String rucSucursal;

    // Getters and Setters
    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
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

    public String getRucSucursal() {
        return rucSucursal;
    }

    public void setRucSucursal(String rucSucursal) {
        this.rucSucursal = rucSucursal;
    }
}

