package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Producto;
import com.lucasxyz.gestioncancha.Entities.Stock;
import com.lucasxyz.gestioncancha.Entities.Sucursal;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockRepository extends JpaRepository<Stock, Integer> { 
    Stock findByProductoAndSucursal(Producto producto, Sucursal sucursal);
    
    // Consulta personalizada que hace un JOIN entre Stock y Producto
    @Query("SELECT s, p.nombre AS productoNombre FROM Stock s JOIN s.producto p")
    List<Object[]> findAllWithProductoNombre();

    // Ahora con la notación correcta para buscar por el nombre del producto
    List<Stock> findByProducto_Nombre(String nombre);

    // Método para eliminar por ID
    void deleteById(Integer id);

    // Buscar un stock por producto
    Optional<Stock> findByProducto(Producto producto);

    // Consulta para obtener Stock por ID de Producto y ID de Sucursal
    @Query("SELECT s FROM Stock s WHERE s.producto.id = :productoId AND s.sucursal.id = :sucursalId")
    Stock findByProductoIdAndSucursalId(@Param("productoId") Long productoId, @Param("sucursalId") int sucursalId);

    // Método para encontrar Stock por ID de Producto
    @Query("SELECT s FROM Stock s WHERE s.producto.id = :productoId")
    List<Stock> findByProducto_Id(@Param("productoId") Long productoId);

}       

