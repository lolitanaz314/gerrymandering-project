package com.example.server.repository;

import com.example.server.model.District;
import com.example.server.model.id.DistrictId;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface DistrictRepository extends JpaRepository<District, DistrictId> {

    Set<District> findByStateIdAndPlanId(StateCode stateId, String dpId);

    Optional<District> findByStateIdAndPlanIdAndDistrictId(StateCode stateId, String dpId, int id);
}