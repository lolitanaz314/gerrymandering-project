package com.example.server.repository;

import com.example.server.model.DemographicDistrict;
import com.example.server.model.id.DistrictId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicDistrictRepository extends JpaRepository<DemographicDistrict, DistrictId> {
    // get demographic of district
    @Query(value = "SELECT * FROM demographic_district " +
            "WHERE state_id = ?1 AND " +
            "district_plan_id = ?2 AND " +
            "district_id = ?3", nativeQuery = true)
    DemographicDistrict findDistrictDemographic(int state_id, int district_plan_id, int district_id);
}