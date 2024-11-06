package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Cancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CanchaRepository extends JpaRepository<Cancha, UUID> {
}
