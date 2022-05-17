package com.example.server.repository;

import com.example.server.model.DistrictPlan;
import com.example.server.model.id.DistrictPlanId;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictPlanRepository extends JpaRepository<DistrictPlan, DistrictPlanId> {

//    List<DistrictPlan> findByStateId(StateCode state_id);
//
//    Optional<DistrictPlan> findByStateIdAndPlanId(StateCode state_id, String id);

    @Query(value = "SELECT * FROM (SELECT * FROM district_plan WHERE status >= 0) " +
            "as d WHERE state_id = ?1", nativeQuery = true)
    List<DistrictPlan> findByStateId(int state_id);

    @Query(value = "SELECT * FROM (SELECT * FROM district_plan WHERE status >= 0) " +
            "as d WHERE state_id = ?1 AND district_plan_id = ?2", nativeQuery = true)
    Optional<DistrictPlan> findByStateIdAndPlanId(int state_id, String district_plan_id);

}