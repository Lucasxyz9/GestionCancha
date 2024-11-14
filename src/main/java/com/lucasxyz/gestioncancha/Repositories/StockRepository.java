package com.lucasxyz.gestioncancha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasxyz.gestioncancha.Entities.Stock;

public interface StockRepository extends JpaRepository<Stock, Integer> {}

