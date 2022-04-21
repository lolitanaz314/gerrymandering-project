package com.example.server.service;

import com.example.server.model.id.DistrictId;
import com.example.server.model.id.PrecinctId;
import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Demographic;
import com.example.server.repository.DemographicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class DemographicService {
    @Autowired
    private final DemographicRepository dmRepository;
    public DemographicService(DemographicRepository dmRepository) {
        this.dmRepository = dmRepository;
    }

    // get demographic of state
    public Map<RacialCategory, Integer> getDemographicByStateId(StateCode id) {
        int state = id.ordinal();

        Map<RacialCategory, Integer> demographic = new HashMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByStateId(state);
            // System.out.println(s.size());
            for (Demographic category : s) {
                demographic.put(category.getRace(), category.getPopulation());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of district
    public Map<RacialCategory, Integer> getDemographicByDistrictId(DistrictId id) {
        int state = id.getStateId().ordinal();
        int districtPlan = id.getDistrictId();
        int district = id.getDistrictId();

        Map<RacialCategory, Integer> demographic = new HashMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByDistrictPlanAndDistrictId(state, districtPlan, district);
            for (Demographic category : s) {
                demographic.put(category.getRace(), category.getPopulation());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of precinct
    public Map<RacialCategory, Integer> getDemographicByPrecinctId(PrecinctId id) {
        int state = id.getStateId().ordinal();
        int precinct = id.getPrecinctId();

        Map<RacialCategory, Integer> demographic = new HashMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByPrecinctId(state, precinct);
            for (Demographic category : s) {
                demographic.put(category.getRace(), category.getPopulation());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
