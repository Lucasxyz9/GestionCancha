package com.lucasxyz.gestioncancha.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasxyz.gestioncancha.Entities.Producto;;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    public abstract List<Producto> findByCantidadMinimaLessThan(int cantidad);


    //boolean existsByNombre(String nombre);
    
}
