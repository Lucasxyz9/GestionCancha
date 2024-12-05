package com.lucasxyz.gestioncancha.Entities;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
public class DetalleCaja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Genera automáticamente el ID
    private Long idDetalleCaja;  // ID único para DetalleCaja

    @ManyToOne
    @JoinColumn(name = "id_caja", referencedColumnName = "id_caja", nullable = false)
    private Caja caja;  // Relación con la entidad Caja (ahora tipo Caja, no Integer)
    
    @ManyToOne
    @JoinColumn(name = "id_producto", referencedColumnName = "id_producto", nullable = false)
    private Producto producto;  // Relación con la entidad Producto
    
    @ManyToOne
    @JoinColumn(name = "id_stock", referencedColumnName = "idStock", nullable = false)
    private Stock stock;  // Relación con la entidad Stock
    
    private int cantidad;  // Cantidad del producto vendido
    private LocalDate fecha;  // Fecha de la venta

    // Getters y setters
    public Long getIdDetalleCaja() {
        return idDetalleCaja;
    }

    public void setIdDetalleCaja(Long idDetalleCaja) {
        this.idDetalleCaja = idDetalleCaja;
    }

    public Caja getCaja() {
        return caja;
    }

    public void setCaja(Caja caja) {  // Cambiado a Caja, no Integer
        this.caja = caja;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}

