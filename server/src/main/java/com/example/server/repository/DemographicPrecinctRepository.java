package com.example.server.repository;

import com.example.server.model.DemographicPrecinct;
import com.example.server.model.id.PrecinctId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicPrecinctRepository extends JpaRepository<DemographicPrecinct, PrecinctId> {
    // get demographic of precinct
    @Query(value = "SELECT * FROM demographic_precinct " +
            "WHERE state_id = ?1 AND precinct_id = ?2", nativeQuery = true)
    DemographicPrecinct findPrecinctDemographic(int state_id, int precinct_id);
}