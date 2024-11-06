package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
}

