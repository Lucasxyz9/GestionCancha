package com.lucasxyz.gestioncancha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasxyz.gestioncancha.Entities.DetalleCaja;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DetalleCajaRepository extends JpaRepository<DetalleCaja, Long> {

    // Método para encontrar todos los detalles por una caja específica
    List<DetalleCaja> findByCajaIdCaja(Long idCaja);

    // Método para encontrar todos los detalles por un producto específico
    //List<DetalleCaja> findByProductoId_producto(Long idProducto);

    // Método para encontrar todos los detalles por un stock específico
    List<DetalleCaja> findByStockIdStock(Long idStock);

    // Opcional: método para encontrar los detalles por la fecha (si es necesario)
    List<DetalleCaja> findByFechaBetween(LocalDateTime startDate, LocalDateTime endDate);
}
