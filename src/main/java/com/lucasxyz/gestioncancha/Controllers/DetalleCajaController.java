package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.DetalleCaja;
import com.lucasxyz.gestioncancha.Repositories.DetalleCajaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/detalle-caja")
public class DetalleCajaController {

    @Autowired
    private DetalleCajaRepository detalleCajaRepository;

    // Obtener todos los detalles de caja
    @GetMapping
    public List<DetalleCaja> getAllDetalles() {
        return detalleCajaRepository.findAll();
    }

    // Obtener un detalle de caja por ID
    @GetMapping("/{id}")
    public ResponseEntity<DetalleCaja> getDetalleById(@PathVariable Long id) {
        Optional<DetalleCaja> detalleCaja = detalleCajaRepository.findById(id);
        return detalleCaja.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo detalle de caja
    @PostMapping
    public ResponseEntity<DetalleCaja> createDetalleCaja(@RequestBody DetalleCaja detalleCaja) {
        try {
            DetalleCaja nuevoDetalle = detalleCajaRepository.save(detalleCaja);
            return ResponseEntity.ok(nuevoDetalle);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Manejo de errores
        }
    }

    // Actualizar un detalle de caja existente
    @PutMapping("/{id}")
    public ResponseEntity<DetalleCaja> updateDetalleCaja(@PathVariable Long id, @RequestBody DetalleCaja detalleCajaDetails) {
        Optional<DetalleCaja> detalleCaja = detalleCajaRepository.findById(id);

        if (detalleCaja.isPresent()) {
            DetalleCaja existingDetalleCaja = detalleCaja.get();
            // Aquí actualizas las propiedades del detalle
            existingDetalleCaja.setCaja(detalleCajaDetails.getCaja());
            existingDetalleCaja.setStock(detalleCajaDetails.getStock());
            existingDetalleCaja.setProducto(detalleCajaDetails.getProducto());
            existingDetalleCaja.setCantidad(detalleCajaDetails.getCantidad());
            existingDetalleCaja.setFecha(detalleCajaDetails.getFecha());

            // Guardamos y retornamos el detalle actualizado
            return ResponseEntity.ok(detalleCajaRepository.save(existingDetalleCaja));
        } else {
            return ResponseEntity.notFound().build();  // Si no se encuentra el detalle
        }
    }

    // Eliminar un detalle de caja
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetalleCaja(@PathVariable Long id) {
        if (detalleCajaRepository.existsById(id)) {
            detalleCajaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();  // Si no existe el detalle a eliminar
        }
    }
}
