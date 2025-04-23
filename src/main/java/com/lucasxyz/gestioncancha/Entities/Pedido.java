package com.lucasxyz.gestioncancha.Entities;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pedido")

    public class Pedido {
    
        @Id
        @GeneratedValue
        @Column(name = "id_pedido", nullable = false, unique = true)
        private long idPedido;
    
        @Column(name = "fecha", nullable = false)
        @Temporal(TemporalType.TIMESTAMP)
        private Date fecha;
    
        @ManyToOne
        @JoinColumn(name = "cliente_id", nullable = false)
        private Cliente cliente;
    
        @ManyToOne
        @JoinColumn(name = "empresa_id", nullable = false)
        private Empresa empresa;
    
        // Getters y Setters
    
        public long getIdPedido() {
            return idPedido;
        }
    
        public void setIdPedido(long idPedido) {
            this.idPedido = idPedido;
        }
    
        public Date getFecha() {
            return fecha;
        }
    
        public void setFecha(Date fecha) {
            this.fecha = fecha;
        }
    
        public Cliente getCliente() {
            return cliente;
        }
    
        public void setCliente(Cliente cliente) {
            this.cliente = cliente;
        }
    
        public Empresa getEmpresa() {
            return empresa;
        }
    
        public void setEmpresa(Empresa empresa) {
            this.empresa = empresa;
        }
}
