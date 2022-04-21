package com.example.server.repository;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.id.PrecinctId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PrecinctRepository extends JpaRepository<Precinct, PrecinctId> {

    Set<Precinct> findByStateId(StateCode state_id);
    // Iterable<Precinct> findByStateId(StateCode state_id);

    Optional<Precinct> findByStateIdAndId(StateCode state_id, int id);
}
