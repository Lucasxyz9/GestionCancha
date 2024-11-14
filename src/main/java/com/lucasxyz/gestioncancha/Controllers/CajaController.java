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

import com.lucasxyz.gestioncancha.Entities.Caja;
import com.lucasxyz.gestioncancha.Repositories.CajaRepository;

@RestController
@RequestMapping("/api/cajas")

public class CajaController {
    @Autowired
    private CajaRepository cajaRepository;

    @GetMapping
    public List<Caja> getAllCajas() {
        return cajaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Caja getCajaById(@PathVariable int id) {
        return cajaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Caja createCaja(@RequestBody Caja caja) {
        return cajaRepository.save(caja);
    }

    @PutMapping("/{id}")
    public Caja updateCaja(@PathVariable int id, @RequestBody Caja cajaDetails) {
        Caja caja = cajaRepository.findById(id).orElse(null);
        if (caja != null) {
            caja.setMonto(cajaDetails.getMonto());
            caja.setFecha(cajaDetails.getFecha());
            return cajaRepository.save(caja);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCaja(@PathVariable int id) {
        cajaRepository.deleteById(id);
    }
}
