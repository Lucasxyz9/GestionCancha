package com.lucasxyz.gestioncancha.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasxyz.gestioncancha.Entities.Sucursal;
import com.lucasxyz.gestioncancha.Repositories.SucursalRepository;

@RestController
@RequestMapping("/api/sucursales")  
public class SucursalController {

    @Autowired
    private SucursalRepository sucursalRepository;

    // Obtener todas las sucursales
    @GetMapping
    public List<Sucursal> getAllSucursales() {
        return sucursalRepository.findAll();
    }

    // Crear una nueva sucursal
    @PostMapping
    public ResponseEntity<Sucursal> createSucursal(@RequestBody Sucursal sucursal) {
        try {
            Sucursal savedSucursal = sucursalRepository.save(sucursal);
            return ResponseEntity.ok(savedSucursal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Actualizar una sucursal existente
    @PutMapping("/{id}")
    public ResponseEntity<Sucursal> updateSucursal(@PathVariable int id, @RequestBody Sucursal sucursal) {
        if (!sucursalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        sucursal.setIdSucursal(id);
        Sucursal updatedSucursal = sucursalRepository.save(sucursal);
        return ResponseEntity.ok(updatedSucursal);
    }

    // Eliminar una sucursal
    @DeleteMapping("/{id}")
    public void deleteSucursal(@PathVariable int id) {
        sucursalRepository.deleteById(id);
    }
}
