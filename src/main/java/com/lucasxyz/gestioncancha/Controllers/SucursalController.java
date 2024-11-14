package com.lucasxyz.gestioncancha.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Sucursal> getAllSucursales() {
        return sucursalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Sucursal getSucursalById(@PathVariable int id) {
        return sucursalRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Sucursal createSucursal(@RequestBody Sucursal sucursal) {
        return sucursalRepository.save(sucursal);
    }

    @PutMapping("/{id}")
    public Sucursal updateSucursal(@PathVariable int id, @RequestBody Sucursal sucursal) {
        sucursal.setIdSucursal(id);
        return sucursalRepository.save(sucursal);
    }

    @DeleteMapping("/{id}")
    public void deleteSucursal(@PathVariable int id) {
        sucursalRepository.deleteById(id);
    }
}