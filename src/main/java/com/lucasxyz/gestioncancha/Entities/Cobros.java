package com.lucasxyz.gestioncancha.Entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Cobros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCobro;

    private BigDecimal monto;
    private LocalDateTime fecha;
    private String metodoPago;
    private String numero_transaccion;

    @ManyToOne
    @JoinColumn(name = "id_caja")
    private Caja caja;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    public Integer getIdCobro() {
        return idCobro;
    }

    public void setIdCobro(Integer idCobro) {
        this.idCobro = idCobro;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Caja getCaja() {
        return caja;
    }

    public void setCaja(Caja caja) {
        this.caja = caja;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }    

    public String getNumero_transaccion() {
        return numero_transaccion;
    }

    public void setNumero_transaccion(String numero_transaccion) {
        this.numero_transaccion = numero_transaccion;
    }
}
