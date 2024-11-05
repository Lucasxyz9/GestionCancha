package com.lucasxyz.gestioncancha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasxyz.gestioncancha.Entities.Bebida;;

@Repository
public interface BebidaRepository extends JpaRepository<Bebida, Long> {

}
