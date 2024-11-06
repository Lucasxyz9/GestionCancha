package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Pedido;
import com.lucasxyz.gestioncancha.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Pedido> getPedidoById(@PathVariable UUID id) {
        return pedidoRepository.findById(id);
    }

    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    @PutMapping("/{id}")
    public Pedido updatePedido(@PathVariable UUID id, @RequestBody Pedido pedidoDetails) {
        pedidoDetails.setIdPedido(id);
        return pedidoRepository.save(pedidoDetails);
    }

    @DeleteMapping("/{id}")
    public void deletePedido(@PathVariable UUID id) {
        pedidoRepository.deleteById(id);
    }
}