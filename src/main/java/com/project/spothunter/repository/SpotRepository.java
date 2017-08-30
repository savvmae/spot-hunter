package com.project.spothunter.repository;

import com.project.spothunter.model.Spot;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SpotRepository extends JpaRepository<Spot, Integer>{
}
