package com.lucasxyz.gestioncancha.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lucasxyz.gestioncancha.Entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // This method finds products where the minimum quantity is less than a specified value
    public abstract List<Producto> findByCantidadMinimaLessThan(int cantidad);

    // Query to find products associated with a specific sucursal by checking Stock
    @Query("SELECT p FROM Producto p WHERE p.id_producto IN (SELECT s.producto.id_producto FROM Stock s WHERE s.sucursal.idSucursal = :sucursalId AND s.cantidad > 0)")
    public List<Producto> findBySucursalId(Long sucursalId);
}
