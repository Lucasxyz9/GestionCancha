package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Cliente findByCi(String ci);

    Cliente findByRuc(String ruc);

    // Si quieres una búsqueda que permita encontrar un cliente con ambos parámetros, puedes hacerlo:
    Optional<Cliente> findByCiOrRuc(String ci, String ruc);

    List<Cliente> findByCiContaining(String ci);  // Busca clientes cuyo CI contenga el valor proporcionado
}

