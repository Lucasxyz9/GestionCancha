package com.lucasxyz.gestioncancha.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lucasxyz.gestioncancha.Entities.Usuario;
import com.lucasxyz.gestioncancha.Repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Usuario> getUsuarios() {
        return userRepository.findAll(); // ✅ Llamamos al método desde la instancia
    }
    
    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario) {
        usuario.setFechaCreacion(LocalDateTime.now());  // Asignar fecha de creación automáticamente
        Usuario savedUser = userRepository.save(usuario);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
}

