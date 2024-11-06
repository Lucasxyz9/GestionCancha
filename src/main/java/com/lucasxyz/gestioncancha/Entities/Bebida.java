package com.lucasxyz.gestioncancha.Entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @OneToMany(mappedBy = "bebida")
    private List<DetallePedido> detallesPedido;

    public Long getId_bebidas() {
        return id_bebidas;
    }

    public void setId_bebidas(Long id_bebidas) {
        this.id_bebidas = id_bebidas;
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

    public List<DetallePedido> getDetallesPedido() {
        return detallesPedido;
    }

    public void setDetallesPedido(List<DetallePedido> detallesPedido) {
        this.detallesPedido = detallesPedido;
    }
    


}
