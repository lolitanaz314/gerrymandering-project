package com.example.server.repository;

import com.example.server.model.State;
import com.example.server.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<State, StateCode> {
}
