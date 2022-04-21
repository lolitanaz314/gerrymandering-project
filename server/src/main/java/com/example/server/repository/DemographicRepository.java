package com.example.server.repository;

import com.example.server.model.Demographic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DemographicRepository extends JpaRepository<Demographic, Integer> {
    // get demographic of state
    @Query(value = "SELECT * FROM demographic " +
            "WHERE state_id = ?1 AND " +
            "district_plan_id IS null AND " +
            "precinct_id IS null", nativeQuery = true)
    List<Demographic> findDemographicByStateId(int state_id);

    // get demographic of district
    @Query(value = "SELECT * FROM demographic " +
            "WHERE state_id = ?1 AND " +
            "district_plan_id = ?2 AND " +
            "district_id = ?3", nativeQuery = true)
    List<Demographic> findDemographicByDistrictPlanAndDistrictId(int state_id, int district_plan_id, int district_id);

    // get demographic of precinct
    @Query(value = "SELECT * FROM demographic " +
            "WHERE state_id = ?1 AND precinct_id = ?2", nativeQuery = true)
    List<Demographic> findDemographicByPrecinctId(int state_id, int precinct_id);
}