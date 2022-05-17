package com.example.server.service;

import com.example.server.model.District;
import com.example.server.model.DistrictPlan;
import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;
import com.example.server.repository.DistrictPlanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
        System.out.println("Service districtPlans ...");
        List<DistrictPlan> districtPlans = dpRepository.findByStateId(stateId.ordinal());
        for (DistrictPlan dp : districtPlans){
            dp.setDupStateId(stateId);
            dp.setDupPlanId(dp.getPlanId());
            dp.setDistricts(dService.getDistrictsByPlanId(dp.getStateId(), dp.getPlanId()));
            dp.setDemographic(packDemographic(dp));

            //measures
            dp.setPopulationEquality(getPopulationEqualityMeasure(dp));
            dp.setMeanMedianDiff(getMeanMedianDiff(dp));
            dp.setNumMajorityMinorityDistricts(getMajorityMinorityCount(dp));
            dp.setCompetitiveDistrictCount(getCompetitiveDistrictCount(dp));
            dp.setEfficiencyGap(getEfficiencyGapMeasure(dp));
            dp.setPolsbyPopper(getCompactnessMeasure(dp));
        }
        System.out.println("Returning districtPlans ...");
        return dpRepository.findByStateId(stateId.ordinal());
    }

    public DistrictPlan getPlanByStateIdAndDistrictId(StateCode stateId, String planId) {
        System.out.println("Service districtPlan ...");
        try{
            Optional<DistrictPlan> dp = dpRepository.findByStateIdAndPlanId(stateId.ordinal(), planId);
            if(dp.isPresent()){
                dp.get().setDupStateId(stateId);
                dp.get().setDupPlanId(planId);
                dp.get().setDistricts(dService.getDistrictsByPlanId(stateId, planId));
                dp.get().setDemographic(packDemographic(dp.get()));

                //measures
                dp.get().setPopulationEquality(getPopulationEqualityMeasure(dp.get()));
                dp.get().setMeanMedianDiff(getMeanMedianDiff(dp.get()));
                dp.get().setNumMajorityMinorityDistricts(getMajorityMinorityCount(dp.get()));
                dp.get().setCompetitiveDistrictCount(getCompetitiveDistrictCount(dp.get()));
                dp.get().setEfficiencyGap(getEfficiencyGapMeasure(dp.get()));
                dp.get().setPolsbyPopper(getCompactnessMeasure(dp.get()));

                System.out.println("Returning districtPlan ...");
                return dp.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    public Map<Category, Integer> packDemographic(DistrictPlan s) {
        Map<Category, Integer> demographic = new HashMap<>();
        try {
            demographic.put(Category.White, s.getWhite());
            demographic.put(Category.Black, s.getAfricanAmerican());
            demographic.put(Category.Hispanic, s.getHispanic());
            demographic.put(Category.Asian, s.getAsian());
            demographic.put(Category.Native, s.getNativeHawaiian());
            demographic.put(Category.Mixed, s.getTwoOrMore());
//            System.out.println("SIZE: " + demographic.size());
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
    public double getCompactnessMeasure(DistrictPlan dp){
        double SumCompactness = 0.0;

        for (District d: dp.getDistricts()){
            SumCompactness += d.getPolsbyPopper();
        }
        return SumCompactness / dp.getDistricts().size();
    }
    public double getPopulationEqualityMeasure(DistrictPlan dp){    // PERCENT
        int population;
        int minPop = Integer.MAX_VALUE;
        int maxPop = 0;

        for (District d: dp.getDistricts()){
            population = d.getTotalPop();
            minPop = Math.min(population, minPop);
            maxPop = Math.max(population, maxPop);
        }
        double ideal = (double) dp.getTotalPop() / dp.getDistricts().size();
        double minDev = Math.abs((minPop - ideal)/ideal) * 100;
        double maxDev = Math.abs((maxPop - ideal)/ideal) * 100;

        // System.out.println("Deviation: " + Math.abs(maxDev + minDev));
        return Math.abs(maxDev + minDev);
    }
    public int getMeanMedianDiff(DistrictPlan dp){
        int[] democraticVotes = new int[dp.getDistricts().size()];
        int mean = 0, median = 0, total = 0;

        int ind = 0;
        for (District d: dp.getDistricts()){
            int pop = d.getDemocraticPres();    // democratic president
            democraticVotes[ind++] = pop;
            total += pop;
        }
        Arrays.sort(democraticVotes);
        // System.out.print("Sorted: " + Arrays.toString(democraticVotes));
        if (ind > 0){
            median = democraticVotes[(ind-1)/2];
            mean = total / ind;
        } return Math.abs(mean - median);
    }
    public double getEfficiencyGapMeasure(DistrictPlan dp){
        int demoCount, repubCount, total = 0;
        int demoWasted = 0, repubWasted = 0;

        for (District d: dp.getDistricts()){
            demoCount = d.getDemocraticPres();
            repubCount = d.getRepublicanPres();

            if(demoCount > repubCount){ // if democrat wins
                demoWasted += demoCount - repubCount;
                repubWasted += repubCount;
            } else{                     // if republic wins
                demoWasted += demoCount;
                repubWasted += repubCount - demoCount;
            }
            total += demoCount + repubCount;
        } return (double) 100 * (demoWasted - repubWasted) / total;
    }   // PERCENT
    public int getMajorityMinorityCount(DistrictPlan dp){
        int count = 0;
        for (District d: dp.getDistricts()){
            if ((double) d.getAfricanAmerican() / d.getTotalPop() >= 0.5){
                count++;
            }
        } return count;
    }
    public int getCompetitiveDistrictCount(DistrictPlan dp){
        int count = 0;
        double competitiveness;
        for (District d: dp.getDistricts()){
            competitiveness = (double) d.getDemocraticPres() / d.getRepublicanPres();
            if (competitiveness  >= 0.1){
                count++;
            }
        } return count;
    }
//    public Map<Integer, Integer> getEstimationofVoteResults()
//    public double getSplitCountyMeasure()
//    public SeatVoteCurve getVoteSeatCurve()
}
