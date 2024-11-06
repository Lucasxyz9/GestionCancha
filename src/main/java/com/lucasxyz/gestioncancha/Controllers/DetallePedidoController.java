package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.DetallePedido;
import com.lucasxyz.gestioncancha.Repositories.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/detalle-pedidos")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @GetMapping
    public List<DetallePedido> getAllDetallePedidos() {
        return detallePedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<DetallePedido> getDetallePedidoById(@PathVariable UUID id) {
        return detallePedidoRepository.findById(id);
    }

    @PostMapping
    public DetallePedido createDetallePedido(@RequestBody DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }

    @PutMapping("/{id}")
    public DetallePedido updateDetallePedido(@PathVariable UUID id, @RequestBody DetallePedido detallePedidoDetails) {
        detallePedidoDetails.setIdDetallePedido(id);
        return detallePedidoRepository.save(detallePedidoDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteDetallePedido(@PathVariable UUID id) {
        detallePedidoRepository.deleteById(id);
    }
}

