// EDITING needed
package com.example.server.repository;

import com.example.server.enumeration.StateCode;
import com.example.server.model.Demographic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DemographicRepository extends JpaRepository<Demographic, Integer> {
    // get demographic of state
    @Query(value = "SELECT * FROM demographic\n" +
            "WHERE state_id = 5 AND " +
            "district_plan_id IS null AND " +
            "precinct_id IS null", nativeQuery = true)
    List<Demographic> findDemographicByStateIdNamedParamsNative(@Param("state_id") StateCode stateId);

    // get demographic of district

    // get demographic of precinct

}