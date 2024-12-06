package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Stock;
import com.lucasxyz.gestioncancha.Entities.Sucursal;
import com.lucasxyz.gestioncancha.Entities.Producto;
import com.lucasxyz.gestioncancha.Repositories.ProductoRepository;
import com.lucasxyz.gestioncancha.Repositories.StockRepository;
import com.lucasxyz.gestioncancha.Repositories.SucursalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private ProductoRepository productoRepository;


    // Obtener todos los registros de Stock (GET)
    @GetMapping
    public List<Stock> obtenerTodosLosStocks() {
        // Ejecutamos la consulta personalizada que trae el nombre del producto
        List<Object[]> results = stockRepository.findAllWithProductoNombre();

        // Convertimos el resultado a una lista de Stock con el nombre del producto
        List<Stock> stocks = new ArrayList<>();
        for (Object[] result : results) {
            Stock stock = (Stock) result[0]; // El primer objeto es el Stock

            // Asignamos el nombre del producto al Stock (de forma temporal para la respuesta)
            stocks.add(stock);
        }

        return stocks;
    }

    // Obtener un registro de Stock por su ID (GET)
    @GetMapping("/{stockId}")
    public Stock obtenerStockPorId(@PathVariable int stockId) {
        return stockRepository.findById(stockId)
                .orElseThrow(() -> new RuntimeException("Stock no encontrado"));
    }

    @GetMapping("/api/stock")
    public Page<Stock> getStocks(@RequestParam int page, @RequestParam int size) {
    PageRequest pageable = PageRequest.of(page, size);
        return stockRepository.findAll(pageable);
    }


    @PostMapping("/save")
public ResponseEntity<Map<String, String>> crearStock(@RequestBody Map<String, Object> datos) {
    try {
        // Convertir identificadores a Long
        Long idProducto = Long.valueOf(datos.get("idProducto").toString());
        Integer idSucursal = (Integer) datos.get("idSucursal");
        Integer cantidad = (Integer) datos.get("cantidad");
        Double precio = datos.get("precio") != null ? Double.parseDouble(datos.get("precio").toString()) : null;

        // Validar que no falten datos
        if (idProducto == null || idSucursal == null || cantidad == null || precio == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Faltan valores obligatorios en el JSON");
            return ResponseEntity.badRequest().body(response);
        }

        // Buscar entidades relacionadas
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Sucursal sucursal = sucursalRepository.findById(idSucursal)
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        // Buscar si ya existe un stock con el producto y la sucursal
        Stock stockExistente = stockRepository.findByProductoAndSucursal(producto, sucursal);

        if (stockExistente != null) {
            // Si existe, actualizar la cantidad
            stockExistente.setCantidad(stockExistente.getCantidad() + cantidad);
            stockExistente.setPrecio(precio);  // Actualizar precio si es necesario
            stockRepository.save(stockExistente);  // Guardar actualización

            Map<String, String> response = new HashMap<>();
            response.put("message", "Stock actualizado exitosamente");
            return ResponseEntity.ok(response);
        } else {
            // Si no existe, crear un nuevo stock
            Stock nuevoStock = new Stock();
            nuevoStock.setProducto(producto);
            nuevoStock.setSucursal(sucursal);
            nuevoStock.setCantidad(cantidad);
            nuevoStock.setPrecio(precio);

            stockRepository.save(nuevoStock); // Guardar en la base de datos

            Map<String, String> response = new HashMap<>();
            response.put("message", "Stock creado exitosamente");
            return ResponseEntity.ok(response);
        }

    } catch (Exception e) {
        // Manejar errores
        Map<String, String> response = new HashMap<>();
        response.put("message", "Error al crear o actualizar el stock: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

    



    @GetMapping("/producto/nombre/{nombre}")
    public ResponseEntity<Stock> obtenerStockPorNombre(@PathVariable String nombre) {
    List<Stock> stocks = stockRepository.findByProducto_Nombre(nombre);

    if (stocks.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    // Retornamos el primer stock encontrado (puedes cambiar esta lógica si necesitas manejar múltiples resultados)
        return ResponseEntity.ok(stocks.get(0)); 
    }




    // Eliminar un registro de Stock (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Integer id) {
    System.out.println("ID recibido: " + id);  // Verifica que el ID sea recibido correctamente
    if (!stockRepository.existsById(id)) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    stockRepository.deleteById(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @PostMapping("/many")
    public ResponseEntity<?> saveMany(@RequestBody List<Stock> stockList) {
        try {
            for (Stock stock : stockList) {
            // Validar la existencia de las relaciones
            Producto producto = productoRepository.findById(stock.getProducto().getId_producto())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + stock.getProducto().getId_producto()));
            Sucursal sucursal = sucursalRepository.findById(stock.getSucursal().getIdSucursal())
                    .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada: " + stock.getSucursal().getIdSucursal()));

            // Asignar las entidades completas a la entidad Stock
            stock.setProducto(producto);
            stock.setSucursal(sucursal);

             // Guardar en la base de datos
            stockRepository.save(stock);
        }

        // Enviar mensaje de éxito
            return ResponseEntity.ok("Stocks guardados correctamente");

        } catch (Exception e) {
        e.printStackTrace();
        // Enviar mensaje de error con código 400
            return ResponseEntity.badRequest().body("Error al guardar los stocks: " + e.getMessage());
        }
    }



    
}