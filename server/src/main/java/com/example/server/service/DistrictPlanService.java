package com.example.server.service;

import com.example.server.model.DistrictPlan;
import com.example.server.enumeration.StateCode;
import com.example.server.repository.DistrictPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class DistrictPlanService {
    @Autowired
    private final DistrictPlanRepository dpRepository;
    public DistrictPlanService(DistrictPlanRepository dpRepository) {
        this.dpRepository = dpRepository;
    }

    // public List<DistrictPlan> findAll() { return dpRepository.findAll(); }

    public List<DistrictPlan> getDistrictPlansByStateId(StateCode stateId) {
        return (List<DistrictPlan>) dpRepository.findByStateId(stateId);
    }

    public DistrictPlan getDistrictPlanById(StateCode stateId, int id) {
        try{
            Optional<DistrictPlan> dp = dpRepository.findByStateIdAndId(stateId, id);
            return dp.get();
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
