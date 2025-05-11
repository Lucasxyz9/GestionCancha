package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Cancha;
import com.lucasxyz.gestioncancha.Entities.Sucursal;
import com.lucasxyz.gestioncancha.Repositories.CanchaRepository;
import com.lucasxyz.gestioncancha.Repositories.SucursalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/canchas")
public class CanchaController {

    @Autowired
    private CanchaRepository canchaRepository;

    @Autowired
    private SucursalRepository sucursalRepository;

    // Método para crear una cancha
    @PostMapping
    public ResponseEntity<?> crearCancha(@RequestBody Cancha cancha) {
        try {
            // Validar que el nombre y la ubicación no sean nulos o vacíos
            if (cancha.getNombre() == null || cancha.getNombre().isEmpty()) {
                return new ResponseEntity<>("El nombre de la cancha es obligatorio", HttpStatus.BAD_REQUEST);
            }

            if (cancha.getUbicacion() == null || cancha.getUbicacion().isEmpty()) {
                return new ResponseEntity<>("La ubicación de la cancha es obligatoria", HttpStatus.BAD_REQUEST);
            }

            // Validar que idSucursal no sea nulo ni negativo
            if (cancha.getSucursal() == null || cancha.getSucursal().getIdSucursal() == null || cancha.getSucursal().getIdSucursal() == -1) {
                return new ResponseEntity<>("El idSucursal es obligatorio", HttpStatus.BAD_REQUEST);
            }
            
            

            // Buscar la sucursal
            Optional<Sucursal> sucursalOptional = sucursalRepository.findById(cancha.getSucursal().getIdSucursal());
            if (!sucursalOptional.isPresent()) {
                return new ResponseEntity<>("Sucursal no encontrada", HttpStatus.BAD_REQUEST);
            }

            // Asignar la sucursal a la cancha
            Sucursal sucursal = sucursalOptional.get();
            cancha.setSucursal(sucursal);

            // El idCancha no debe ser enviado en la solicitud, así que lo dejamos como null
            cancha.setIdCancha(null);

            // Guardar la cancha en la base de datos
            Cancha canchaGuardada = canchaRepository.save(cancha);
            return new ResponseEntity<>(canchaGuardada, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error inesperado: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/sucursal/{idSucursal}")
    public ResponseEntity<List<Cancha>> obtenerCanchasPorSucursal(@PathVariable Integer idSucursal) {
        List<Cancha> canchas = canchaRepository.findBySucursal_IdSucursal(idSucursal);
        
        if (canchas == null || canchas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(canchas);
    }

    // Método para obtener todas las canchas
    @GetMapping
    public List<Cancha> obtenerTodasLasCanchas() {
        return canchaRepository.findAll();
    }

    // Método para obtener el estado de las canchas
    @GetMapping("/estado")
    public List<Map<String, String>> getEstadoCanchas() {
        List<Cancha> canchas = canchaRepository.findAll();

        return canchas.stream()
            .map(c -> {
                Map<String, String> info = new HashMap<>();
                info.put("sucursal", c.getSucursal() != null ? c.getSucursal().getNombre() : "Sin sucursal");
                info.put("estado", c.getEstado());
                return info;
            })
            .sorted(Comparator.comparing(m -> m.get("sucursal")))
            .collect(Collectors.toList());
    }

    // Método para eliminar una cancha
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCancha(@PathVariable Integer id) {
        Optional<Cancha> cancha = canchaRepository.findById(id);
        if (cancha.isPresent()) {
            canchaRepository.deleteById(id);  // Elimina la cancha por ID
            return ResponseEntity.noContent().build();  // Devuelve un código 204 (sin contenido)
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Devuelve un 404 si la cancha no se encuentra
        }
    }


        /*@PutMapping("/{id}")
        public ResponseEntity<Cancha> actualizarCancha(@PathVariable Integer id, @RequestBody Cancha canchaActualizada) {
            Optional<Cancha> optionalCancha = canchaRepository.findById(id);
            if (optionalCancha.isPresent()) {
                Cancha canchaExistente = optionalCancha.get();

                // Actualizar los campos necesarios
                canchaExistente.setNombre(canchaActualizada.getNombre());
                canchaExistente.setUbicacion(canchaActualizada.getUbicacion());
                canchaExistente.setEstado(canchaActualizada.getEstado());
                canchaExistente.setSucursal(canchaActualizada.getSucursal());

                Cancha canchaGuardada = canchaRepository.save(canchaExistente);
                return ResponseEntity.ok(canchaGuardada);
            } else {
                return ResponseEntity.notFound().build();
            }
        }*/

                @PutMapping("/{id}")
        public ResponseEntity<?> actualizarCancha(@PathVariable Integer id, @RequestBody Cancha cancha) {
            try {
                Optional<Cancha> optionalCancha = canchaRepository.findById(id);
                if (!optionalCancha.isPresent()) {
                    return new ResponseEntity<>("Cancha no encontrada", HttpStatus.NOT_FOUND);
                }

                Cancha canchaExistente = optionalCancha.get();

                // Validaciones similares al POST
                if (cancha.getNombre() == null || cancha.getNombre().isEmpty()) {
                    return new ResponseEntity<>("El nombre de la cancha es obligatorio", HttpStatus.BAD_REQUEST);
                }

                if (cancha.getUbicacion() == null || cancha.getUbicacion().isEmpty()) {
                    return new ResponseEntity<>("La ubicación de la cancha es obligatoria", HttpStatus.BAD_REQUEST);
                }

                if (cancha.getSucursal() == null || cancha.getSucursal().getIdSucursal() == null || cancha.getSucursal().getIdSucursal() == -1) {
                    return new ResponseEntity<>("El idSucursal es obligatorio", HttpStatus.BAD_REQUEST);
                }

                Optional<Sucursal> sucursalOptional = sucursalRepository.findById(cancha.getSucursal().getIdSucursal());
                if (!sucursalOptional.isPresent()) {
                    return new ResponseEntity<>("Sucursal no encontrada", HttpStatus.BAD_REQUEST);
                }

                Sucursal sucursal = sucursalOptional.get();

                // Actualizar campos
                canchaExistente.setNombre(cancha.getNombre());
                canchaExistente.setUbicacion(cancha.getUbicacion());
                canchaExistente.setEstado(cancha.getEstado());
                canchaExistente.setSucursal(sucursal);

                Cancha actualizada = canchaRepository.save(canchaExistente);
                return new ResponseEntity<>(actualizada, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>("Error inesperado: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }



}
