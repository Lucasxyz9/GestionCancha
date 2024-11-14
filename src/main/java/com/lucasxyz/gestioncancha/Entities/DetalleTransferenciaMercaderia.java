package com.lucasxyz.gestioncancha.Entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.UUID;
import java.math.BigDecimal;

@Entity
@Table(name = "detalle_transferencia_mercaderia")
public class DetalleTransferenciaMercaderia {

    @Id
    @GeneratedValue
    @Column(name = "id_detalle_transferencia", nullable = false)
    private UUID idDetalleTransferencia;

    @ManyToOne
    @JoinColumn(name = "id_transferencia", nullable = false)
    private TransferenciaMercaderia transferencia;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "precio_unitario", nullable = false)
    private BigDecimal precioUnitario;

    // Getters y Setters
    public UUID getIdDetalleTransferencia() {
        return idDetalleTransferencia;
    }

    public void setIdDetalleTransferencia(UUID idDetalleTransferencia) {
        this.idDetalleTransferencia = idDetalleTransferencia;
    }

    public TransferenciaMercaderia getTransferencia() {
        return transferencia;
    }

    public void setTransferencia(TransferenciaMercaderia transferencia) {
        this.transferencia = transferencia;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }
}
