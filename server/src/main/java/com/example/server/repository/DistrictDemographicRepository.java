package com.example.server.repository;

import com.example.server.model.DistrictDemographic;
import com.example.server.model.id.DistrictId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictDemographicRepository extends JpaRepository<DistrictDemographic, DistrictId> {
    // get demographic of district
    @Query(value = "SELECT * FROM district_demographic " +
            "WHERE state_id = ?1 AND " +
            "district_plan_id = ?2 AND " +
            "district_id = ?3", nativeQuery = true)
    DistrictDemographic findDistrictDemographic(int state_id, int district_plan_id, int district_id);
}