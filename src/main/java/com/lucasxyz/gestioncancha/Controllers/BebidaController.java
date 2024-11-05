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

import com.lucasxyz.gestioncancha.Entities.Bebida;
import com.lucasxyz.gestioncancha.Repositories.BebidaRepository;

@RestController
@RequestMapping("/bebidas")
public class BebidaController {
    
    @Autowired
    private BebidaRepository bebidaRepository;
    
    @GetMapping
    public List <Bebida> getAllBebidas(){
        return bebidaRepository.findAll();
    }

    
    @GetMapping("/{id}")
    public Bebida obtenerBebidaPorId(@PathVariable Long id) {
        return bebidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
    }
    

    @PostMapping
    public Bebida createBebida(@RequestBody Bebida bebida){
        return bebidaRepository.save(bebida);
    }

    @PutMapping("/{id}")
    public Bebida updateBebida(@PathVariable Long id, @RequestBody Bebida bebidaDetalles) {
        Bebida bebida = bebidaRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
    
        bebida.setNombre(bebidaDetalles.getNombre());
        bebida.setPrecio_unitario((int) bebidaDetalles.getPrecio_unitario());
        bebida.setCanitad_disponible(bebidaDetalles.getCanitad_disponible());
        bebida.setTipo(bebidaDetalles.getTipo());
    
        return bebidaRepository.save(bebida);
    }

    @DeleteMapping("/{id}")
    public String deleteBebida(@PathVariable Long id) {
        Bebida bebida = bebidaRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
        
        bebidaRepository.delete(bebida);
        return "la bebida con el id:"+id+"fue eliminada con éxito";
    }

    
}