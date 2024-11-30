package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.MovimientoInventario;
import com.lucasxyz.gestioncancha.Repositories.MovimientoInventarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimientos")
public class MovimientoInventarioController {

    private final MovimientoInventarioRepository repository;

    public MovimientoInventarioController(MovimientoInventarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MovimientoInventario> listarMovimientos() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<MovimientoInventario> registrarMovimiento(@RequestBody MovimientoInventario movimiento) {
        return ResponseEntity.ok(repository.save(movimiento));
    }
}
