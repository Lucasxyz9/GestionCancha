package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long id_producto;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio_unitario")
    private Double precio_unitario;

    @Column(name = "cantidad_disponible")
    private Integer cantidad_disponible;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "cantidad_minima")
    private Integer cantidadMinima = 10;

    @OneToMany(mappedBy = "producto")
    private List<DetallePedido> detallesPedido;

    @OneToMany(mappedBy = "producto")
    private List<DetalleCaja> detallesCaja;  // Relación con DetalleCaja

    @ManyToOne
    @JoinColumn(name = "sucursal_id")  // Asumiendo que esta es la columna de la clave foránea
    private Sucursal sucursal;



    // Constructor vacío
    public Producto() {}

    // Constructor con parámetros
    public Producto(String nombre, Double precio_unitario, Integer cantidad_disponible, String tipo, Integer cantidadMinima) {
        this.nombre = nombre;
        this.precio_unitario = precio_unitario;
        this.cantidad_disponible = cantidad_disponible;
        this.tipo = tipo;
        this.cantidadMinima = cantidadMinima;
    }

    // Getters y Setters
    public Long getId_producto() {
        return id_producto;
    }

    public void setId_producto(Long id_producto) {
        this.id_producto = id_producto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio_unitario() {
        return precio_unitario;
    }

    public void setPrecio_unitario(Double precio_unitario) {
        this.precio_unitario = precio_unitario;
    }

    public Integer getCantidad_disponible() {
        return cantidad_disponible;
    }

    public void setCantidad_disponible(Integer cantidad_disponible) {
        this.cantidad_disponible = cantidad_disponible;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getCantidad_minima() {
        return cantidadMinima;
    }

    public void setCantidad_minima(Integer cantidad_minima) {
        this.cantidadMinima = cantidad_minima;
    }

    public List<DetallePedido> getDetallesPedido() {
        return detallesPedido;
    }

    public void setDetallesPedido(List<DetallePedido> detallesPedido) {
        this.detallesPedido = detallesPedido;
    }

    public List<DetalleCaja> getDetallesCaja() {
        return detallesCaja;
    }

    public void setDetallesCaja(List<DetalleCaja> detallesCaja) {
        this.detallesCaja = detallesCaja;
    }
}
