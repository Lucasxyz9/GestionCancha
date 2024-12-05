package com.lucasxyz.gestioncancha.Entities;

public class ProductoVenta {
    private Long productoId;
    private int sucursalId;
    private int cantidadVendida;

    // Constructor vacío
    public ProductoVenta() {}

    // Constructor con parámetros
    public ProductoVenta(Long productoId, int sucursalId, int cantidadVendida) {
        this.productoId = productoId;
        this.sucursalId = sucursalId;
        this.cantidadVendida = cantidadVendida;
    }

    // Getters y setters
    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public int getSucursalId() {
        return sucursalId;
    }

    public void setSucursalId(int sucursalId) {
        this.sucursalId = sucursalId;
    }

    public int getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(int cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }
}
