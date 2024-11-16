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

import com.lucasxyz.gestioncancha.Entities.Producto;
import com.lucasxyz.gestioncancha.Repositories.ProductoRepository;

@RestController
@RequestMapping("/productos")

public class ProductoController {
    
    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping
    public Producto agregarProducto(@RequestBody Producto producto) {
        // Agregar logs para cada campo del producto
        System.out.println("Producto recibido:");
        System.out.println("Nombre: " + producto.getNombre());
        System.out.println("Precio: " + producto.getPrecio_unitario());
        System.out.println("Tipo: " + producto.getTipo());
        System.out.println("Cantidad: " + producto.getCantidad_disponible());
    
        Producto productoGuardado = productoRepository.save(producto);
        System.out.println("Producto agregado con éxito: " + productoGuardado);
        return productoGuardado;
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

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody Producto productoDetalles) {
        Producto producto = productoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
    
        producto.setNombre(productoDetalles.getNombre());
        producto.setPrecio_unitario(productoDetalles.getPrecio_unitario());
        producto.setCantidad_disponible(productoDetalles.getCantidad_disponible());
        producto.setTipo(productoDetalles.getTipo());
    
        return productoRepository.save(producto);
    }

    @DeleteMapping("/{id}")
    public String deleteProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
        
        productoRepository.delete(producto);
        return "El producto con el ID: " + id + " fue eliminado con éxito";
    }
}


    
