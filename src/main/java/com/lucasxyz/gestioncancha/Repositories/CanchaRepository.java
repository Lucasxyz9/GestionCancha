package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Cancha;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CanchaRepository extends JpaRepository<Cancha, Integer> {
    public List<Cancha> findBySucursal_IdSucursal(Integer idSucursal);

}
