package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Cancha;
import com.lucasxyz.gestioncancha.Repositories.CanchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/canchas")
public class CanchaController {

    @Autowired
    private CanchaRepository canchaRepository;

    @GetMapping
    public List<Cancha> getAllCanchas() {
        return canchaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cancha> getCanchaById(@PathVariable UUID id) {
        return canchaRepository.findById(id);
    }

    @PostMapping
    public Cancha createCancha(@RequestBody Cancha cancha) {
        return canchaRepository.save(cancha);
    }

    @PutMapping("/{id}")
    public Cancha updateCancha(@PathVariable UUID id, @RequestBody Cancha canchaDetails) {
        canchaDetails.setIdCancha(id);
        return canchaRepository.save(canchaDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteCancha(@PathVariable UUID id) {
        canchaRepository.deleteById(id);
    }
}
