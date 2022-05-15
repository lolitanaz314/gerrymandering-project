package com.example.server.service;

import com.example.server.model.State;
import com.example.server.model.enumeration.Category;
import com.example.server.model.id.DistrictId;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.District;
import com.example.server.repository.DistrictRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DistrictService {
    @Autowired
    private final DistrictRepository dRepository;
    // private final PrecinctService pService;
//    private final DemographicService dmService;

    public DistrictService(DistrictRepository dRepository) {
        this.dRepository = dRepository;
        // this.pService = pService;
    }

    // public List<District> findAll() {return dRepository.findAll(); }

    public Set<District> getDistrictsByPlanId(StateCode stateId, String planId){
        Set<District> districts = dRepository.findByStateIdAndPlanId(stateId, planId);
        for (District d : districts){
            d.setDemographic(packDemographic(d));
            // d.setPrecincts(pService.get(dp.getStateId(), dp.getId()));
        }
        System.out.println("Service districts ...");
        return districts;
    }

    public District getDistrictByPlanIdAndDistrictId(StateCode stateId, String planId, int districtId) {
        try{
            Optional<District> d = dRepository.findByStateIdAndPlanIdAndDistrictId(stateId, planId, districtId);
            if(d.isPresent()){
                 d.get().setDemographic(packDemographic(d.get()));
                System.out.println("Service district ...");
                return d.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    public Map<Category, Integer> packDemographic(District d) {
        Map<Category, Integer> demographic = new HashMap<>();
        try {
            demographic.put(Category.WHITE, d.getWhite());
            demographic.put(Category.BLACK, d.getAfricanAmerican());
            demographic.put(Category.HISPANIC, d.getHispanic());
            demographic.put(Category.ASIAN, d.getAsian());
            demographic.put(Category.NATIVE, d.getNativeHawaiian());
            demographic.put(Category.MIXED, d.getTwoOrMore());
//            System.out.println("SIZE: " + demographic.size());
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
//    public double getCompactnessMeasure(){
//        return 0;
//    }
//    public boolean isMajorityMinorityDistrict(int totalPop, int minorityPop){
//        // get population and demographic of district
//        return false;
//    }
//    public boolean isCompetitiveDistrict(int[] votes){
//        return (float)(Math.abs(votes[0] - votes[1])/((votes[0] + votes[1])/2)) * 100 > .1;
//    }
//    public int[] getWastedVotes(int[] votes){
//        return new int[] {1, 1};
//    }
}
