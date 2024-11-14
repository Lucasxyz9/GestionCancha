package com.lucasxyz.gestioncancha.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TransferenciaMercaderia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTransferencia;

    private int cantidad;
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "id_sucursal_origen")
    private Sucursal sucursalOrigen;

    @ManyToOne
    @JoinColumn(name = "id_sucursal_destino")
    private Sucursal sucursalDestino;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    public Integer getIdTransferencia() {
        return idTransferencia;
    }

    public void setIdTransferencia(Integer idTransferencia) {
        this.idTransferencia = idTransferencia;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Sucursal getSucursalOrigen() {
        return sucursalOrigen;
    }

    public void setSucursalOrigen(Sucursal sucursalOrigen) {
        this.sucursalOrigen = sucursalOrigen;
    }

    public Sucursal getSucursalDestino() {
        return sucursalDestino;
    }

    public void setSucursalDestino(Sucursal sucursalDestino) {
        this.sucursalDestino = sucursalDestino;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }


    

}
