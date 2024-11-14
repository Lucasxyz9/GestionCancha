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

import com.lucasxyz.gestioncancha.Entities.Timbrado;
import com.lucasxyz.gestioncancha.Repositories.TimbradoRepository;

@RestController
@RequestMapping("/api/timbrados")
public class TimbradoController {

    @Autowired
    private TimbradoRepository timbradoRepository;

    @GetMapping
    public List<Timbrado> getAllTimbrados() {
        return timbradoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Timbrado getTimbradoById(@PathVariable int id) {
        return timbradoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Timbrado createTimbrado(@RequestBody Timbrado timbrado) {
        return timbradoRepository.save(timbrado);
    }

    @PutMapping("/{id}")
    public Timbrado updateTimbrado(@PathVariable int id, @RequestBody Timbrado timbrado) {
        timbrado.setIdTimbrado(id);
        return timbradoRepository.save(timbrado);
    }

    @DeleteMapping("/{id}")
    public void deleteTimbrado(@PathVariable int id) {
        timbradoRepository.deleteById(id);
    }
}
