package com.lucasxyz.gestioncancha.Entities;

import java.time.LocalDate;
import java.util.List;

public class RegistroVenta {
    private int idSucursal;
    private double monto;
    private LocalDate fecha;
    private List<DetalleCaja> detalles; // Aquí debería ser List<DetalleCaja>

    // Getters y setters
    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public List<DetalleCaja> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleCaja> detalles) {
        this.detalles = detalles;
    }
}


