package com.lucasxyz.gestioncancha.Controllers;

import org.springframework.web.bind.annotation.*;

import com.lucasxyz.gestioncancha.Entities.Caja;
import com.lucasxyz.gestioncancha.Entities.Cliente;
import com.lucasxyz.gestioncancha.Entities.DetalleCaja;
import com.lucasxyz.gestioncancha.Entities.RegistroVenta;
import com.lucasxyz.gestioncancha.Entities.Stock;
import com.lucasxyz.gestioncancha.Entities.Sucursal;
import com.lucasxyz.gestioncancha.Repositories.CajaRepository;
import com.lucasxyz.gestioncancha.Repositories.ClienteRepository;
import com.lucasxyz.gestioncancha.Repositories.DetalleCajaRepository;
import com.lucasxyz.gestioncancha.Repositories.StockRepository;
import com.lucasxyz.gestioncancha.Repositories.SucursalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/caja")
public class CajaController {
    @Autowired
    private ClienteRepository clienteRepository ;

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
public ResponseEntity<Map<String, Object>> registrarVenta(@RequestBody Map<String, Object> datosVenta) {
    Map<String, Object> response = new HashMap<>();
    try {
        // Validar idSucursal
        final Integer sucursalId;
        Object idSucursalObj = datosVenta.get("idSucursal");
        if (idSucursalObj == null) {
            throw new RuntimeException("El campo 'idSucursal' es requerido y no puede ser null");
        }
        if (idSucursalObj instanceof Number) {
            sucursalId = ((Number) idSucursalObj).intValue();
        } else if (idSucursalObj instanceof String) {
            try {
                sucursalId = Integer.parseInt((String) idSucursalObj);
            } catch (NumberFormatException e) {
                throw new RuntimeException("El campo 'idSucursal' debe ser numérico");
            }
        } else {
            throw new RuntimeException("El campo 'idSucursal' debe ser numérico");
        }

        // Validar clienteId
        Object clienteIdObj = datosVenta.get("clienteId");
        if (clienteIdObj == null) {
            throw new RuntimeException("El campo 'clienteId' es requerido");
        }

        Long clienteId;
        if (clienteIdObj instanceof Number) {
            clienteId = ((Number) clienteIdObj).longValue();
        } else if (clienteIdObj instanceof String) {
            try {
                clienteId = Long.parseLong((String) clienteIdObj);
            } catch (NumberFormatException e) {
                throw new RuntimeException("El campo 'clienteId' debe ser numérico");
            }
        } else {
            throw new RuntimeException("El campo 'clienteId' debe ser numérico");
        }

        // Validar que el cliente existe
        Cliente cliente = clienteRepository.findById(clienteId.intValue())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + clienteId));


        // Validar productos
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> productos = (List<Map<String, Object>>) datosVenta.get("productos");
        if (productos == null || productos.isEmpty()) {
            throw new RuntimeException("La lista de productos está vacía o es nula");
        }

        // Validar total
        Object totalObj = datosVenta.get("total");
        double total;
        if (totalObj == null) {
            throw new RuntimeException("El campo 'total' es requerido y no puede ser null");
        }
        if (totalObj instanceof Number) {
            total = ((Number) totalObj).doubleValue();
        } else if (totalObj instanceof String) {
            try {
                total = Double.parseDouble((String) totalObj);
            } catch (NumberFormatException e) {
                throw new RuntimeException("El campo 'total' debe ser numérico");
            }
        } else {
            throw new RuntimeException("El campo 'total' debe ser numérico");
        }

        // Buscar la caja activa para la sucursal
        Caja caja = cajaRepository.findBySucursal_IdSucursalAndActivaTrue(sucursalId)
                .orElseThrow(() -> new RuntimeException("No hay caja activa para la sucursal con ID: " + sucursalId));

        // Actualizar el monto de la caja
        caja.setMonto(caja.getMonto().add(BigDecimal.valueOf(total)));
        caja.setCliente(cliente);

        cajaRepository.save(caja);

        // Descontar del stock
        for (Map<String, Object> producto : productos) {
            Object productoIdObj = producto.get("id_producto");
            Long productoId;
            if (productoIdObj == null) {
                throw new RuntimeException("El campo 'id_producto' es requerido en cada producto");
            }
            if (productoIdObj instanceof Number) {
                productoId = ((Number) productoIdObj).longValue();
            } else if (productoIdObj instanceof String) {
                try {
                    productoId = Long.parseLong((String) productoIdObj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException("El campo 'id_producto' debe ser numérico");
                }
            } else {
                throw new RuntimeException("El campo 'id_producto' debe ser numérico");
            }

            Object cantidadObj = producto.get("cantidad");
            int cantidadVendida;
            if (cantidadObj == null) {
                throw new RuntimeException("El campo 'cantidad' es requerido en cada producto");
            }
            if (cantidadObj instanceof Number) {
                cantidadVendida = ((Number) cantidadObj).intValue();
            } else if (cantidadObj instanceof String) {
                try {
                    cantidadVendida = Integer.parseInt((String) cantidadObj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException("El campo 'cantidad' debe ser numérico");
                }
            } else {
                throw new RuntimeException("El campo 'cantidad' debe ser numérico");
            }

            List<Stock> stockList = stockRepository.findByProducto_Id(productoId);
            if (stockList.isEmpty()) {
                throw new RuntimeException("Producto no encontrado en stock para el ID: " + productoId);
            }

            boolean descontado = false;
            for (Stock stock : stockList) {
                if (stock.getCantidad() >= cantidadVendida) {
                    stock.setCantidad(stock.getCantidad() - cantidadVendida);
                    stockRepository.save(stock);
                    descontado = true;
                    break;
                }
            }
            if (!descontado) {
                throw new RuntimeException("Stock insuficiente para el producto: " + productoId);
            }
        }

        response.put("message", "Venta registrada exitosamente, cliente verificado y stock actualizado");
        response.put("status", "success");
        return ResponseEntity.ok(response);

    } catch (Exception e) {
        e.printStackTrace();
        response.put("message", "Error al registrar la venta: " + e.getMessage());
        response.put("status", "error");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}






        // Abrir una caja para una sucursal (cerrando las anteriores activas)
@PostMapping("/abrir")
public ResponseEntity<?> abrirCaja(@RequestBody Map<String, Object> datos) {
    try {
        Object sucursalIdObj = datos.get("sucursalId");
        Integer sucursalId = null;

        if (sucursalIdObj instanceof Number) {
            sucursalId = ((Number) sucursalIdObj).intValue();
        } else if (sucursalIdObj instanceof String) {
            sucursalId = Integer.parseInt((String) sucursalIdObj);
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "sucursalId inválido"));
        }

        Sucursal sucursal = sucursalRepository.findById(sucursalId)
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        cajaRepository.findBySucursal_IdSucursalAndActivaTrue(sucursalId).ifPresent(caja -> {
            caja.setActiva(false);
            cajaRepository.save(caja);
        });

        Caja nuevaCaja = new Caja();
        nuevaCaja.setFecha(LocalDate.now());
        nuevaCaja.setMonto(BigDecimal.ZERO);
        nuevaCaja.setActiva(true);
        nuevaCaja.setSucursal(sucursal);

        cajaRepository.save(nuevaCaja);

        return ResponseEntity.ok(Map.of(
                "message", "Caja abierta exitosamente",
                "idCaja", nuevaCaja.getIdCaja()
        ));
    } catch (NumberFormatException nfe) {
        return ResponseEntity.badRequest().body(Map.of("message", "sucursalId debe ser un número válido"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Error al abrir caja: " + e.getMessage()));
    }
}

    


@PostMapping("/crearCaja")
public ResponseEntity<?> crearCaja(@RequestBody Map<String, Object> datosCaja) {
    try {
        Integer sucursalId = (Integer) datosCaja.get("sucursalId");  // o cast adecuado según tu frontend
        Optional<Sucursal> sucursalOpt = sucursalRepository.findById(sucursalId);

        if (!sucursalOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sucursal no encontrada");
        }

        Sucursal sucursal = sucursalOpt.get();

        Caja nuevaCaja = new Caja();
        nuevaCaja.setSucursal(sucursal);
        nuevaCaja.setFecha(LocalDate.now());
        nuevaCaja.setMonto(BigDecimal.ZERO);

        cajaRepository.save(nuevaCaja);

        return ResponseEntity.ok("Caja creada correctamente");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear la caja");
    }
}

    
}
    
    




