package com.lucasxyz.gestioncancha.Controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasxyz.gestioncancha.Entities.DetalleTransferenciaMercaderia;
import com.lucasxyz.gestioncancha.Repositories.DetalleTransferenciaMercaderiaRepository;

@RestController
@RequestMapping("/api/detalletransferencias")
public class DetalleTransferenciaMercaderiaController {
    @Autowired
    private DetalleTransferenciaMercaderiaRepository detalleTransferenciaRepository;

    // Método GET para obtener todos los detalles de transferencias
    @GetMapping
    public List<DetalleTransferenciaMercaderia> getAllDetalleTransferencias() {
    return detalleTransferenciaRepository.findAll();
    }
    // Método GET para obtener un detalle de transferencia por ID

    @GetMapping("/{id}")
    public DetalleTransferenciaMercaderia getDetalleTransferenciaById(@PathVariable UUID id) {
        return (DetalleTransferenciaMercaderia) detalleTransferenciaRepository.findById(id).orElse(null);
    }
    // Método POST para crear un nuevo detalle de transferencia

    @PostMapping
    public DetalleTransferenciaMercaderia createDetalleTransferencia(@RequestBody DetalleTransferenciaMercaderia detalleTransferencia) {
        return detalleTransferenciaRepository.save(detalleTransferencia);
    }
    
    
    // Método PUT para actualizar un detalle de transferencia existente

    @PutMapping("/{id}")
    public DetalleTransferenciaMercaderia updateDetalleTransferencia(@PathVariable UUID id, @RequestBody DetalleTransferenciaMercaderia detalleTransferenciaDetails) {
        return detalleTransferenciaRepository.findById(id)
            .map(detalle -> {
                detalle.setCantidad(detalleTransferenciaDetails.getCantidad());
                detalle.setPrecioUnitario(detalleTransferenciaDetails.getPrecioUnitario());
                return detalleTransferenciaRepository.save(detalle);
            }).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void deleteDetalleTransferencia(@PathVariable UUID id) {
        detalleTransferenciaRepository.deleteById(id);
    }

}
