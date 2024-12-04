package com.lucasxyz.gestioncancha.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "detalle_caja")
public class DetalleCaja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_caja")
    private Long idDetalleCaja;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_caja", nullable = false)
    private Caja caja;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_stock", nullable = false)
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", referencedColumnName = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    // Constructor vacío
    public DetalleCaja() {
    }

    // Constructor con parámetros
    public DetalleCaja(Caja caja, Stock stock, Producto producto, Integer cantidad) {
        this.caja = caja;
        this.stock = stock;
        this.producto = producto;
        this.cantidad = cantidad;
        this.fecha = LocalDateTime.now();  // Asignación de fecha al crear
    }

    @PrePersist
    public void prePersist() {
        if (this.fecha == null) {
            this.fecha = LocalDateTime.now();  // Asigna la fecha si es nula
        }
    }

    // Getters y Setters
    public Long getIdDetalleCaja() {
        return idDetalleCaja;
    }

    public void setIdDetalleCaja(Long idDetalleCaja) {
        this.idDetalleCaja = idDetalleCaja;
    }

    public Caja getCaja() {
        return caja;
    }

    public void setCaja(Caja caja) {
        this.caja = caja;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
