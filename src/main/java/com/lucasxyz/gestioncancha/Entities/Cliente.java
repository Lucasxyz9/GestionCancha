package com.lucasxyz.gestioncancha.Entities;

import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCliente;

    private String nombre;
    private String telefono;
    private String email;

    @OneToMany(mappedBy = "cliente")
    private List<Reserva> reservas;

    // Getters y setters
}
