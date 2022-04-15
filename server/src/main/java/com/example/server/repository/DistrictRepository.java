package com.example.server.repository;

import com.example.server.model.District;
import com.example.server.id.DistrictId;
import com.example.server.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, DistrictId> {

    Iterable<District> findByStateIdAndDistrictPlanId(StateCode stateId, int dpId);

    Optional<District> findByStateIdAndDistrictPlanIdAndId(StateCode stateId, int dpId, int id);
}