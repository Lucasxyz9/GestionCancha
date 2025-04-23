package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Cliente;
import com.lucasxyz.gestioncancha.Repositories.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> getClienteById(@PathVariable Integer id) {
        return clienteRepository.findById(id);
    }

    @PostMapping
    public ResponseEntity<Cliente> guardarCliente(@RequestBody Cliente cliente) {
        Cliente nuevoCliente = clienteRepository.save(cliente);
        return ResponseEntity.ok(nuevoCliente);
    }

    @PutMapping("/{id}")
    public Cliente updateCliente(@PathVariable Integer   id, @RequestBody Cliente clienteDetails) {
        if (id == null || id == 0)  {
            throw new IllegalArgumentException("ID is required");
        }
        clienteDetails.setIdCliente(id);
        return clienteRepository.save(clienteDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Cliente>> eliminarCliente(@PathVariable Integer id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            // Devuelve la lista de clientes actualizada
            List<Cliente> clientesActualizados = (List<Cliente>) clienteRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(clientesActualizados);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<Cliente> buscarCliente(@RequestParam(required = false) String ci,
                                                @RequestParam(required = false) String ruc) {
        if ((ci == null || ci.isEmpty()) && (ruc == null || ruc.isEmpty())) {
            return ResponseEntity.badRequest().build(); // Retorna 400 Bad Request
        }

        Cliente cliente = null;
        
        // Si ambos parámetros son null o vacíos, no se realiza la búsqueda.
        if (ci != null && !ci.isEmpty()) {
            cliente = clienteRepository.findByCi(ci.trim());  // Usar trim() para limpiar valores
        }
        
        if (cliente == null && ruc != null && !ruc.isEmpty()) {
            cliente = clienteRepository.findByRuc(ruc.trim()); // Buscar por RUC si no se encontró por CI
        }

        if (cliente != null) {
            return ResponseEntity.ok(cliente); // Retorna 200 OK con el cliente encontrado
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 Not Found
    }


    
    @GetMapping("/probar")
    public ResponseEntity<String> probar(@RequestParam String ci) {
        ci = ci.trim();  // Elimina espacios y saltos de línea
        Cliente cliente = clienteRepository.findByCi(ci);
        if (cliente != null) {
            return ResponseEntity.ok("Cliente encontrado: " + cliente.getNombre());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
    }


    

}
