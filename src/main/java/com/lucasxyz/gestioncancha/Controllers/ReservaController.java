package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Reserva;
import com.lucasxyz .gestioncancha.Repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> getReservaById(@PathVariable UUID id) {
        return reservaRepository.findById(id);
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @PutMapping("/{id}")
    public Reserva updateReserva(@PathVariable UUID id, @RequestBody Reserva reservaDetails) {
        reservaDetails.setIdReserva(id);
        return reservaRepository.save(reservaDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteReserva(@PathVariable UUID id) {
        reservaRepository.deleteById(id);
    }
}

