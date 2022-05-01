package com.example.server.repository;

import com.example.server.model.PrecinctDemographic;
import com.example.server.model.id.PrecinctId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrecinctDemographicRepository extends JpaRepository<PrecinctDemographic, PrecinctId> {
    // get demographic of precinct
    @Query(value = "SELECT * FROM precinct_demographic " +
            "WHERE state_id = ?1 AND precinct_id = ?2", nativeQuery = true)
    PrecinctDemographic findPrecinctDemographic(int state_id, int precinct_id);
}