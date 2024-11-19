package com.lucasxyz.gestioncancha.Controllers;


import java.util.List;
import java.util.Optional;

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

import com.lucasxyz.gestioncancha.Entities.Producto;
import com.lucasxyz.gestioncancha.Repositories.ProductoRepository;

@RestController
@RequestMapping("/productos")

public class ProductoController {
    
    @Autowired
    private ProductoRepository productoRepository;

     @PostMapping
    public ResponseEntity<?> createProducto(@RequestBody Producto producto) {
        // Verificar si el producto ya existe
       // if (productoRepository.existsByNombre(producto.getNombre())) {
         //   return ResponseEntity.status(HttpStatus.CONFLICT)
           //         .body("El producto con el nombre '" + producto.getNombre() + "' ya existe.");
        //}
        Producto nuevoProducto = productoRepository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    



    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll(); 
    }

    @GetMapping("/{id}")
    public Producto obtenerProductoPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
    }
    @GetMapping("/productos/stock")
    public List<Producto> obtenerStock() {
    return productoRepository.findAll();
    }   
    
    @GetMapping("/productos/alerta-reabastecimiento")
    public List<Producto> obtenerProductosConBajoStock() {
    int cantidadMinima =10;
        return productoRepository.findByCantidadMinimaLessThan(cantidadMinima);
    }
    

    @PutMapping("/{id_producto}")
    public ResponseEntity<Producto> updateProducto(
        @PathVariable Long id_producto,
        @RequestBody Producto productoActualizado) {
        Optional<Producto> productoExistente = productoRepository.findById(id_producto);
    if (productoExistente.isPresent()) {
        Producto producto = productoExistente.get();
        producto.setNombre(productoActualizado.getNombre());
        producto.setPrecio_unitario(productoActualizado.getPrecio_unitario());
        producto.setCantidad_disponible(productoActualizado.getCantidad_disponible());
        producto.setTipo(productoActualizado.getTipo());
        Producto actualizado = productoRepository.save(producto);
        return ResponseEntity.ok(actualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public String deleteProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
        
        productoRepository.delete(producto);
        return "El producto con el ID: " + id + " fue eliminado con éxito";
    }
}


    
