package com.lucasxyz.gestioncancha.Controllers;
import com.lucasxyz.gestioncancha.Entities.Empresa;
import com.lucasxyz.gestioncancha.Repositories.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Empresa> getEmpresaById(@PathVariable int id) {
        return empresaRepository.findById(id);
    }

    @PostMapping
    public Empresa createEmpresa(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PutMapping("/{id}")
    public Empresa updateEmpresa(@PathVariable int id, @RequestBody Empresa empresaDetails) {
        empresaDetails.setIdEmpresa(id);
        return empresaRepository.save(empresaDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteEmpresa(@PathVariable int id) {
        empresaRepository.deleteById(id);
    }
}

