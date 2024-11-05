package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bebidas")

public class Bebida {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_bebidas;
    private String nombre;
    private String tipo;
    private int canitad_disponible;
    private int precio_unitario;
    
    public Long getId() {
        return id_bebidas;
    }
    public void setId(Long id) {
        this.id_bebidas = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public int getCanitad_disponible() {
        return canitad_disponible;
    }
    public void setCanitad_disponible(int canitad_disponible) {
        this.canitad_disponible = canitad_disponible;
    }
    public int getPrecio_unitario() {
        return precio_unitario;
    }
    public void setPrecio_unitario(int precio_unitario) {
        this.precio_unitario = precio_unitario;
    }


}
