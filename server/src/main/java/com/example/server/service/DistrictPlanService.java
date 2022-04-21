package com.example.server.service;

import com.example.server.model.DistrictPlan;
import com.example.server.model.enumeration.StateCode;
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
    private final DistrictService dService;
    public DistrictPlanService(DistrictPlanRepository dpRepository, DistrictService dService) {
        this.dpRepository = dpRepository;
        this.dService = dService;
    }

    // public List<DistrictPlan> findAll() { return dpRepository.findAll(); }

    public List<DistrictPlan> getDistrictPlansByStateId(StateCode stateId) {
        List<DistrictPlan> districtPlans = dpRepository.findByStateId(stateId);
        for (DistrictPlan dp : districtPlans){
            dp.setDistricts(dService.getDistrictsByDistrictPlanId(dp.getStateId(), dp.getId()));
        }
        return dpRepository.findByStateId(stateId);
    }

    public DistrictPlan getDistrictPlanById(StateCode stateId, int id) {
        try{
            Optional<DistrictPlan> dp = dpRepository.findByStateIdAndId(stateId, id);
            if(dp.isPresent()){
                dp.get().setDistricts(dService.getDistrictsByDistrictPlanId(stateId, id));
                return dp.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
//    +getEstimationofVoteResults(): Map<Integer, Integer>
//    +getPopulationEqualityMeasure(): double
//    +getCompactnessMeasure(): double
//    +getSplitCountyMeasure(): double
//
//    +getMajorityMinorityCount(): int
//    +getCompetitiveDistrictCount(): int
//    +getMeanMedianDiff(): double
//    +getEfficiencyGapMeasure(): double
//
//    +getVoteSeatCurve(): SeatVoteCurve
}
