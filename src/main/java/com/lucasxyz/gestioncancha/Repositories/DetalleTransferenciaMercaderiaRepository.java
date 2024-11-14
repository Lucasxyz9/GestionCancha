package com.lucasxyz.gestioncancha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasxyz.gestioncancha.Entities.DetalleTransferenciaMercaderia;

import java.util.UUID;

@Repository
public interface DetalleTransferenciaMercaderiaRepository extends JpaRepository<DetalleTransferenciaMercaderia, UUID> {
}
