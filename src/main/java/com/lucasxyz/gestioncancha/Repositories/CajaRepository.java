package com.lucasxyz.gestioncancha.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasxyz.gestioncancha.Entities.Caja;

public interface CajaRepository extends JpaRepository<Caja, Long> {
        // Método custom para encontrar la caja activa de una sucursal

Optional<Caja> findBySucursal_IdSucursalAndActivaTrue(Integer idSucursal);

}

