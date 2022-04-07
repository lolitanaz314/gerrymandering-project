package com.example.server.repository;

import com.example.server.model.Precinct;
import org.springframework.data.repository.CrudRepository;

public interface MeasuresRepository extends CrudRepository<Precinct, Integer> {
}