package com.example.server.repository;

import com.example.server.model.District;
import com.example.server.id.DistrictId;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface DistrictRepository extends JpaRepository<District, DistrictId> {

    Set<District> findByStateIdAndDistrictPlanId(StateCode stateId, int dpId);
    // Iterable<District> findByStateIdAndDistrictPlanId(StateCode stateId, int dpId);

    Optional<District> findByStateIdAndDistrictPlanIdAndId(StateCode stateId, int dpId, int id);
}