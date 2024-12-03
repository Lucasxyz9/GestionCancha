package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StockRepository extends JpaRepository<Stock, Integer> {
    // Consulta personalizada que hace un JOIN entre Stock y Producto
    @Query("SELECT s, p.nombre AS productoNombre FROM Stock s JOIN s.producto p")
    List<Object[]> findAllWithProductoNombre();

    List<Stock> findByProductoNombre(String nombre);
    void deleteById(Integer id);

}