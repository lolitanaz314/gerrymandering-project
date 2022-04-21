package com.example.server.repository;

import com.example.server.model.DistrictPlan;
import com.example.server.id.DistrictPlanId;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DistrictPlanRepository extends JpaRepository<DistrictPlan, DistrictPlanId> {

    List<DistrictPlan> findByStateId(StateCode state_id);
    // Iterable<DistrictPlan> findByStateId(StateCode state_id);

    Optional<DistrictPlan> findByStateIdAndId(StateCode state_id, int id);

//    @Query(value = "SELECT * FROM Lynx.district_plan L " +
//            "WHERE L.state_id = ?1", nativeQuery = true)
//    Iterable<DistrictPlan> getDistrictPlanByStateId(StateCode state_id);

//    @Query(value = "SELECT * FROM Lynx.district_plan L " +
//            "WHERE L.state_id = ?1 AND L.id = ?2", nativeQuery = true)
//    Optional<DistrictPlan> getDistrictPlanById(StateCode state_id, long id);

}