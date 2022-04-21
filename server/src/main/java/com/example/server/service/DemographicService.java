package com.example.server.service;

import com.example.server.model.id.DistrictId;
import com.example.server.model.id.PrecinctId;
import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Demographic;
import com.example.server.repository.DemographicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

        SortedMap<RacialCategory, Integer> demographic = new TreeMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByStateId(state);
            // System.out.println(s.size());
            for (Demographic category : s) {
                demographic.put(category.getRace(), category.getTotalPop());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of district
    public Map<RacialCategory, Integer> getDemographicByDistrictId(DistrictId id) {
        int state = id.getStateId().ordinal();
        int districtPlan = id.getDistrictPlanId();
        int district = id.getId();

        SortedMap<RacialCategory, Integer> demographic = new TreeMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByDistrictPlanAndDistrictId(state, districtPlan, district);
            // System.out.println(s.size());
            for (Demographic category : s) {
                demographic.put(category.getRace(), category.getTotalPop());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of precinct
    public Map<RacialCategory, Integer> getDemographicByPrecinctId(PrecinctId id) {
        int state = id.getStateId().ordinal();
        int precinct = id.getId();

        SortedMap<RacialCategory, Integer> demographic = new TreeMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByPrecinctId(state, precinct);
            // System.out.println(s.size());
            for (Demographic category : s) {
                demographic.put(category.getRace(), category.getTotalPop());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
