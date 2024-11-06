package com.lucasxyz.gestioncancha.Repositories;

import com.lucasxyz.gestioncancha.Entities.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
}

