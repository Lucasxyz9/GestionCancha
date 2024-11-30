    package com.lucasxyz.gestioncancha.Controllers;

    import com.lucasxyz.gestioncancha.Entities.Stock;
import com.lucasxyz.gestioncancha.Entities.Sucursal;
import com.lucasxyz.gestioncancha.Repositories.ProductoRepository;
    import com.lucasxyz.gestioncancha.Repositories.StockRepository;
    import com.lucasxyz.gestioncancha.Repositories.SucursalRepository;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

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
            return stockRepository.findAll();
        }

        // Obtener un registro de Stock por su ID (GET)
        @GetMapping("/{stockId}")
        public Stock obtenerStockPorId(@PathVariable int stockId) {
            return stockRepository.findById(stockId)
                    .orElseThrow(() -> new RuntimeException("Stock no encontrado"));
        }

       @PostMapping("/save")
        public Stock createStock(@RequestBody Stock stock) {
        // Verifica que la sucursal exista en la base de datos
        if (!sucursalRepository.existsById(stock.getSucursal().getIdSucursal())) {
            throw new IllegalArgumentException("ID de Sucursal no válido o no presente.");
        }

        // Verifica que el producto exista en la base de datos
        if (!productoRepository.existsById((long) stock.getProductoId())) {
            throw new IllegalArgumentException("ID de Producto no válido o no presente.");
        }

        // Si todo está bien, asigna el objeto Sucursal basado solo en el idSucursal
        Sucursal sucursal = sucursalRepository.findById(stock.getSucursal().getIdSucursal())
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        stock.setSucursal(sucursal);  // Asigna la sucursal completa a la entidad Stock

            return stockRepository.save(stock);
        }


    
        // Eliminar Stock (DELETE)
        @DeleteMapping("/{stockId}")
        public String eliminarStock(@PathVariable int stockId) {
            Stock stock = stockRepository.findById(stockId)
                    .orElseThrow(() -> new RuntimeException("Stock no encontrado"));
            stockRepository.delete(stock);
            return "Stock eliminado con éxito";
        }
    }

