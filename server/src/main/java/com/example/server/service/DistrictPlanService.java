package com.example.server.service;

import com.example.server.model.District;
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

    public List<DistrictPlan> getPlansByStateId(StateCode stateId) {
        List<DistrictPlan> districtPlans = dpRepository.findByStateId(stateId);
        for (DistrictPlan dp : districtPlans){
            dp.setDistricts(dService.getDistrictsByPlanId(dp.getStateId(), dp.getPlanId()));
            // dp.setPopulationEquality(getPopulationEqualityMeasure(dp));
        }
        return dpRepository.findByStateId(stateId);
    }

    public DistrictPlan getPlanByStateIdAndDistrictId(StateCode stateId, int planId) {
        try{
            Optional<DistrictPlan> dp = dpRepository.findByStateIdAndPlanId(stateId, planId);
            if(dp.isPresent()){
                dp.get().setDistricts(dService.getDistrictsByPlanId(stateId, planId));
                return dp.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
//    public double getPopulationEqualityMeasure(DistrictPlan dp){
//        int population;
//        int minPop = Integer.MAX_VALUE;
//        int maxPop = 0;
//        int totalPop = 0;
//
//        for (District d: dp.getDistricts()){
//            population = d.getTotalPop();
//            minPop = Math.min(population, minPop);
//            maxPop = Math.max(population, maxPop);
//            totalPop += population;
//        }
//        return (double) (maxPop - minPop) / totalPop;
//    }
//    public double getCompactnessMeasure(){
//        return 0;
//    }
//    public int getMajorityMinorityCount(){
//        return 0;
//    }
//    public int getCompetitiveDistrictCount(){
//        return 0;
//    }
//    public double getMeanMedianDiff(){
//        return 0;
//    }
//    public double getEfficiencyGapMeasure(){
//        return 0;
//    }
//    public Map<Integer, Integer> getEstimationofVoteResults()
//    public double getSplitCountyMeasure()
//    public SeatVoteCurve getVoteSeatCurve()
}
