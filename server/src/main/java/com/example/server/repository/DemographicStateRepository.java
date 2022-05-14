package com.example.server.repository;

import com.example.server.model.DemographicState;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicStateRepository extends JpaRepository<DemographicState, StateCode> {
    // get demographic of state
    @Query(value = "SELECT * FROM demographic_state " +
            "WHERE state_id = ?1", nativeQuery = true)
    DemographicState findStateDemographic(int state_id);
}