package com.lucasxyz.gestioncancha.Controllers;

import com.lucasxyz.gestioncancha.Entities.Cliente;
import com.lucasxyz.gestioncancha.Repositories.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> getClienteById(@PathVariable UUID id) {
        return clienteRepository.findById(id);
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente updateCliente(@PathVariable UUID id, @RequestBody Cliente clienteDetails) {
        clienteDetails.setIdCliente(id);
        return clienteRepository.save(clienteDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable UUID id) {
        clienteRepository.deleteById(id);
    }
}
