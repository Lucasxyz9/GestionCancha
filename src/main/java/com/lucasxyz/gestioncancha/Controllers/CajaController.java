package com.lucasxyz.gestioncancha.Controllers;

import org.springframework.web.bind.annotation.*;

import com.lucasxyz.gestioncancha.Entities.Caja;
import com.lucasxyz.gestioncancha.Entities.DetalleCaja;
import com.lucasxyz.gestioncancha.Entities.RegistroVenta;
import com.lucasxyz.gestioncancha.Entities.Stock;
import com.lucasxyz.gestioncancha.Entities.Sucursal;
import com.lucasxyz.gestioncancha.Repositories.CajaRepository;
import com.lucasxyz.gestioncancha.Repositories.DetalleCajaRepository;
import com.lucasxyz.gestioncancha.Repositories.StockRepository;
import com.lucasxyz.gestioncancha.Repositories.SucursalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/caja")
public class CajaController {

    @Autowired
    private CajaRepository cajaRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private DetalleCajaRepository detalleCajaRepository;

    @Autowired
    private SucursalRepository sucursalRepository;

    // Endpoint para registrar la venta y actualizar stock
    @PostMapping("/registrar")
    public ResponseEntity<String> registrarVenta(@RequestBody RegistroVenta registroVenta) {
        try {
            // 1. Obtener la instancia de la sucursal por su id
            Sucursal sucursal = sucursalRepository.findById(registroVenta.getIdSucursal())
                    .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

            // 2. Crear una nueva entrada en la tabla `caja`
            Caja nuevaCaja = new Caja();
            nuevaCaja.setSucursal(sucursal);  // Establecer la sucursal correctamente
            nuevaCaja.setMonto(BigDecimal.valueOf(registroVenta.getMonto()));  // Convertir monto a BigDecimal
            nuevaCaja.setFecha(registroVenta.getFecha());  // Usar LocalDate directamente
            cajaRepository.save(nuevaCaja);

            // 3. Registrar cada detalle en `detalle_caja` y descontar el stock
            for (DetalleCaja detalle : registroVenta.getDetalles()) {
                // 3.1 Obtener el Stock de un Producto
                Stock stock = stockRepository.findByProducto(detalle.getProducto())  // Usar el método para encontrar Stock por Producto
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

                if (stock.getCantidad() < detalle.getCantidad()) {
                    return ResponseEntity.badRequest().body("Stock insuficiente para el producto ID: " + stock.getProducto().getId_producto());
                }

                // Descontar el stock
                stock.setCantidad(stock.getCantidad() - detalle.getCantidad());
                stockRepository.save(stock); // Guardar cambios en el stock

                // 3.2 Registrar el detalle en `detalle_caja`
                DetalleCaja detalleCaja = new DetalleCaja();
                detalleCaja.setCaja(nuevaCaja); // Establecer el objeto Caja completo
                detalleCaja.setProducto(detalle.getProducto());  // Asegúrate de que esté correctamente relacionado
                detalleCaja.setCantidad(detalle.getCantidad());
                detalleCajaRepository.save(detalleCaja); // Aquí se guarda el detalle
            }

            return ResponseEntity.ok("Venta registrada y stock actualizado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar la venta: " + e.getMessage());
        }
    }

    @PostMapping("/registrarVenta")
    public ResponseEntity<String> registrarVenta(@RequestBody Map<String, Object> datosVenta) {
        try {
            // Extraer datos del JSON recibido
            Long cajaId = ((Number) datosVenta.get("cajaId")).longValue();
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> productos = (List<Map<String, Object>>) datosVenta.get("productos");
            double total = ((Number) datosVenta.get("total")).doubleValue();

            // 1. Actualizar el monto de la caja
            Caja caja = cajaRepository.findById(cajaId)
                    .orElseThrow(() -> new RuntimeException("Caja no encontrada"));

            // Convertir el total de double a BigDecimal antes de sumarlo
            caja.setMonto(caja.getMonto().add(BigDecimal.valueOf(total)));  // Usar add() para sumar BigDecimal
            cajaRepository.save(caja);

            // 2. Descontar del stock
            for (Map<String, Object> producto : productos) {
                Long productoId = ((Number) producto.get("id_producto")).longValue();
                int cantidadVendida = ((Number) producto.get("cantidad")).intValue();

                // Aquí usamos el método findByProducto_Id que se ajusta a la estructura correcta del repositorio
                Stock stock = stockRepository.findByProducto_Id(productoId)  // Cambié el método a findByProducto_Id
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado en stock"));

                if (stock.getCantidad() < cantidadVendida) {
                    throw new RuntimeException("Stock insuficiente para el producto: " + productoId);
                }

                // Actualizamos el stock reduciendo la cantidad
                stock.setCantidad(stock.getCantidad() - cantidadVendida);
                stockRepository.save(stock);
            }

            return ResponseEntity.ok("Venta registrada exitosamente y stock actualizado");
        } catch (Exception e) {
            // Loguear el error completo para más detalles
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar la venta: " + e.getMessage());
        }
    }



    
}
    
    




