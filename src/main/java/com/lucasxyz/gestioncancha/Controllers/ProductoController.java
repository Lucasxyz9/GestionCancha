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
import com.lucasxyz.gestioncancha.Entities.ProductoVenta;
import com.lucasxyz.gestioncancha.Entities.Stock;
import com.lucasxyz.gestioncancha.Repositories.ProductoRepository;
import com.lucasxyz.gestioncancha.Repositories.StockRepository;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private StockRepository stockRepository;

    // Crear producto
    @PostMapping
    public ResponseEntity<?> createProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoRepository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    // Obtener todos los productos
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll(); 
    }

    // Obtener producto por ID
    @GetMapping("/{id}")
    public Producto obtenerProductoPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
    }

    // Obtener productos con bajo stock
    @GetMapping("/alerta-reabastecimiento")
    public List<Producto> obtenerProductosConBajoStock() {
        int cantidadMinima = 10;
        return productoRepository.findByCantidadMinimaLessThan(cantidadMinima);
    }

    // Obtener productos de una sucursal específica
    @GetMapping("/sucursal/{sucursalId}")
    public List<Producto> obtenerProductosPorSucursal(@PathVariable Long sucursalId) {
        return productoRepository.findBySucursalId(sucursalId);
    }

    // Actualizar producto
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

    // Eliminar producto
    @DeleteMapping("/{id}")
    public String deleteProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
        
        productoRepository.delete(producto);
        return "El producto con el ID: " + id + " fue eliminado con éxito";
    }


    @PostMapping("/finalizar-venta")
    public String finalizarVenta(@RequestBody List<ProductoVenta> productosVenta) {
        // productosVenta debe contener la lista de productos y las cantidades vendidas
        for (ProductoVenta productoVenta : productosVenta) {
            Stock stock = stockRepository.findByProductoIdAndSucursalId(
                productoVenta.getProductoId(), productoVenta.getSucursalId());

            if (stock != null) {
                int nuevaCantidad = stock.getCantidad() - productoVenta.getCantidadVendida();
                if (nuevaCantidad < 0) {
                    return "Error: No hay suficiente stock para el producto " + productoVenta.getProductoId();
                }
                stock.setCantidad(nuevaCantidad);
                stockRepository.save(stock);  // Actualiza el stock
            } else {
                return "Error: Producto no encontrado en la sucursal";
            }
        }
        return "Venta finalizada con éxito";
    }

}




    
