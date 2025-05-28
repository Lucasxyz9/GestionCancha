package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Cancha;
import com.lucasxyz.gestioncancha.Entities.Reserva;
import com.lucasxyz.gestioncancha.Repositories.CanchaRepository;
import com.lucasxyz.gestioncancha.Repositories.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaRepository reservaRepository;
    private final CanchaRepository canchaRepository;

    // Inyección de dependencias para los repositorios
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
        public ResponseEntity<Map<String, String>> createReserva(@RequestBody Reserva reserva) {
            Map<String, String> response = new HashMap<>();

        // Validaciones
        if (reserva.getCancha() == null || reserva.getCancha().getIdCancha() == 0) {
            response.put("mensaje", "La cancha es obligatoria.");
            return ResponseEntity.badRequest().body(response);
        }

        if (reserva.getCliente() == null || reserva.getCliente().getIdCliente() == 0) {
            response.put("mensaje", "El cliente es obligatorio.");
            return ResponseEntity.badRequest().body(response);
        }

        if (reserva.getUsuario() == null || reserva.getUsuario().getIdUsuario() == 0) {
            response.put("mensaje", "El usuario es obligatorio.");
            return ResponseEntity.badRequest().body(response);
        }

        if (reserva.getFecha() == null) {
            response.put("mensaje", "La fecha es obligatoria.");
            return ResponseEntity.badRequest().body(response);
        }

        // Verificar existencia de la cancha
        Optional<Cancha> canchaOptional = canchaRepository.findById(reserva.getCancha().getIdCancha());
        if (!canchaOptional.isPresent()) {
            response.put("mensaje", "La cancha seleccionada no existe.");
            return ResponseEntity.badRequest().body(response);
        }

        // Establecer cancha válida
        reserva.setCancha(canchaOptional.get());

        // Guardar reserva
        reservaRepository.save(reserva);

        response.put("mensaje", "Reserva creada con éxito.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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


        @GetMapping("/por-fecha")
    public ResponseEntity<List<Reserva>> getReservasPorFecha(@RequestParam String fecha) {
        List<Reserva> reservas = reservaRepository.findByFecha(LocalDate.parse(fecha));
        return ResponseEntity.ok(reservas);
    }

}
