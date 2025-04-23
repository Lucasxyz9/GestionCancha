package com.lucasxyz.gestioncancha.Repositories;
import com.lucasxyz.gestioncancha.Entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}

