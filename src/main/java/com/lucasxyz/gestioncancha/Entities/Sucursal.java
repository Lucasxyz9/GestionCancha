package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sucursal")  // La tabla se debe escribir en minúsculas por convención en base de datos
public class Sucursal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sucursal")  // Se mantiene el nombre de la columna para id_sucursal
    private Integer idSucursal;  // Cambié 'int' por 'Integer' para permitir valores nulos

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "ubicacion", nullable = false)
    private String ubicacion;

    @Column(name = "timbrado", nullable = false)  // Asegúrate de que 'timbrado' sea correcto en la base de datos
    private String timbrado;

    // Getters y Setters
    public Integer getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Integer idSucursal) {
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

    public String getTimbrado() {
        return timbrado;
    }

    public void setTimbrado(String timbrado) {
        this.timbrado = timbrado;
    }
}
