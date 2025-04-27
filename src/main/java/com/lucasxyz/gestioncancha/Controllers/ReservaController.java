package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Cancha;
import com.lucasxyz.gestioncancha.Entities.Reserva;
import com.lucasxyz.gestioncancha.Repositories.CanchaRepository;
import com.lucasxyz.gestioncancha.Repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaRepository reservaRepository;
    private final CanchaRepository canchaRepository;

    // Inyección de dependencias para los repositorios
    @Autowired
    public ReservaController(ReservaRepository reservaRepository, CanchaRepository canchaRepository) {
        this.reservaRepository = reservaRepository;
        this.canchaRepository = canchaRepository;
    }

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable long id) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(id);
        if (reservaOptional.isPresent()) {
            return ResponseEntity.ok(reservaOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createReserva(@RequestBody Reserva reserva) {
        // Validar que la cancha no sea nula
        if (reserva.getCancha() == null || reserva.getCancha().getIdCancha() == 0) {
            return ResponseEntity.badRequest().body("La cancha es obligatoria.");
        }

        // Verificar si la cancha existe en la base de datos
        Optional<Cancha> canchaOptional = canchaRepository.findById(reserva.getCancha().getIdCancha());
        if (!canchaOptional.isPresent()) {
            return ResponseEntity.badRequest().body("La cancha seleccionada no existe.");
        }

        // Establecer la cancha válida en la reserva
        reserva.setCancha(canchaOptional.get());

        // Guardar la reserva en la base de datos
        reservaRepository.save(reserva);

        return ResponseEntity.ok("Reserva creada con éxito.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReserva(@PathVariable long id, @RequestBody Reserva reservaDetails) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(id);
        if (!reservaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Reserva reserva = reservaOptional.get();
        reserva.setHoraInicio(reservaDetails.getHoraInicio());
        reserva.setHoraFin(reservaDetails.getHoraFin());

        // Verificar si la cancha existe en la base de datos
        Optional<Cancha> canchaOptional = canchaRepository.findById(reservaDetails.getCancha().getIdCancha());
        if (!canchaOptional.isPresent()) {
            return ResponseEntity.badRequest().body("La cancha seleccionada no existe.");
        }

        // Establecer la cancha válida en la reserva
        reserva.setCancha(canchaOptional.get());

        reserva.setCliente(reservaDetails.getCliente());
        reserva.setUsuario(reservaDetails.getUsuario());
        reserva.setEmpresa(reservaDetails.getEmpresa());

        // Guardar la reserva actualizada en la base de datos
        reservaRepository.save(reserva);

        return ResponseEntity.ok("Reserva actualizada con éxito.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReserva(@PathVariable long id) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(id);
        if (!reservaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Eliminar la reserva de la base de datos
        reservaRepository.deleteById(id);

        return ResponseEntity.ok("Reserva eliminada con éxito.");
    }
}
