package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
}
