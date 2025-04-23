package com.lucasxyz.gestioncancha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasxyz.gestioncancha.Entities.Usuario;

public interface UserRepository extends JpaRepository<Usuario, Long> {
}

