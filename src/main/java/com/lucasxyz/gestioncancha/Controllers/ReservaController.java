package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Reserva;
import com.lucasxyz .gestioncancha.Repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public Optional<Reserva> getReservaById(@PathVariable long id) {
        return reservaRepository.findById(id);
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }


    @PutMapping("/{id}")
    public Reserva updateReserva(@PathVariable long id, @RequestBody Reserva reservaDetails) {
        reservaDetails.setIdReserva(id);
        return reservaRepository.save(reservaDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteReserva(@PathVariable long id) {
        reservaRepository.deleteById(id);
    }
}

