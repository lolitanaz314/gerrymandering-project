package com.example.server.repository;

import com.example.server.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.id.PrecinctId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrecinctRepository extends JpaRepository<Precinct, PrecinctId> {

    Iterable<Precinct> findByStateId(StateCode state_id);

    Optional<Precinct> findByStateIdAndId(StateCode state_id, int id);
}
