package com.example.server.service;

import com.example.server.model.enumeration.Category;
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
        System.out.println("Service districts ...");
        Set<District> districts = dRepository.findByStateIdAndPlanId(stateId, planId);
        for (District d : districts){
            d.setDemographic(packDemographic(d));
            // d.setPrecincts(pService.get(dp.getStateId(), dp.getId()));
        }
        System.out.println("Returning districts ...");
        return districts;
    }

    public District getDistrictByPlanIdAndDistrictId(StateCode stateId, String planId, int districtId) {
        System.out.println("Service district ...");
        try{
            Optional<District> d = dRepository.findByStateIdAndPlanIdAndDistrictId(stateId, planId, districtId);
            if(d.isPresent()){
                 d.get().setDemographic(packDemographic(d.get()));
                System.out.println("Returning district ...");
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
            demographic.put(Category.White, d.getWhite());
            demographic.put(Category.Black, d.getAfricanAmerican());
            demographic.put(Category.Hispanic, d.getHispanic());
            demographic.put(Category.Asian, d.getAsian());
            demographic.put(Category.Native, d.getNativeHawaiian());
            demographic.put(Category.Mixed, d.getTwoOrMore());
//            System.out.println("SIZE: " + demographic.size());
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
