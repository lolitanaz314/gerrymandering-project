package com.example.server.repository;

import com.example.server.model.DistrictPlan;
import com.example.server.model.id.DistrictPlanId;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictPlanRepository extends JpaRepository<DistrictPlan, DistrictPlanId> {

    List<DistrictPlan> findByStateId(StateCode state_id);

    Optional<DistrictPlan> findByStateIdAndPlanId(StateCode state_id, String id);

}