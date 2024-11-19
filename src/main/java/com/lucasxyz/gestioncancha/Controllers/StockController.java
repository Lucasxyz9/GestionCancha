package com.lucasxyz.gestioncancha.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasxyz.gestioncancha.Entities.Producto;
import com.lucasxyz.gestioncancha.Repositories.ProductoRepository;

@RestController
@RequestMapping("/stock")
public class StockController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("/productos")
    public List<Producto> obtenerStock() {
        return productoRepository.findAll(); // Llamada correcta al método de instancia
    }
}
