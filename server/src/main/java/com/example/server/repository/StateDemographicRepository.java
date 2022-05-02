package com.example.server.repository;

import com.example.server.model.StateDemographic;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StateDemographicRepository extends JpaRepository<StateDemographic, StateCode> {
    // get demographic of state
    @Query(value = "SELECT * FROM state_demographic " +
            "WHERE state_id = ?1", nativeQuery = true)
    StateDemographic findStateDemographic(int state_id);
}