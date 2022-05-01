package com.example.server.service;

import com.example.server.model.DistrictDemographic;
import com.example.server.model.PrecinctDemographic;
import com.example.server.model.id.DistrictId;
import com.example.server.model.id.PrecinctId;
import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.StateDemographic;
import com.example.server.repository.DistrictDemographicRepository;
import com.example.server.repository.PrecinctDemographicRepository;
import com.example.server.repository.StateDemographicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class DemographicService {
    @Autowired
    private final StateDemographicRepository stateDemoRepository;
    private final DistrictDemographicRepository distDemoRepository;
    private final PrecinctDemographicRepository precDemoRepository;

    public DemographicService(StateDemographicRepository dmRepository, DistrictDemographicRepository distDemoRepository, PrecinctDemographicRepository precDemoRepository) {
        this.stateDemoRepository = dmRepository;
        this.distDemoRepository = distDemoRepository;
        this.precDemoRepository = precDemoRepository;
    }

    // get demographic of state
    public Map<RacialCategory, Integer> getDemographicByStateId(StateCode id) {
        int state = id.ordinal();

        Map<RacialCategory, Integer> demographic = new HashMap<>();
        try {
            StateDemographic demo = stateDemoRepository.findStateDemographic(state);

            demographic.put(RacialCategory.WHITE, demo.getWhite());
            demographic.put(RacialCategory.BLACK, demo.getAfricanAmerican());
            demographic.put(RacialCategory.HISPANIC, demo.getHispanic());
            demographic.put(RacialCategory.ASIAN, demo.getAsian());
            demographic.put(RacialCategory.NATIVE, demo.getNativeHawaiian());
            demographic.put(RacialCategory.MIXED, demo.getTwoOrMore());

            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of district
    public Map<RacialCategory, Integer> getDemographicByDistrictId(DistrictId id) {
        int state = id.getStateId().ordinal();
        int districtPlan = id.getPlanId();
        int district = id.getDistrictId();

        Map<RacialCategory, Integer> demographic = new HashMap<>();
        try {
            DistrictDemographic s = distDemoRepository.findDistrictDemographic(state, districtPlan, district);

            demographic.put(RacialCategory.WHITE, s.getWhite());
            demographic.put(RacialCategory.BLACK, s.getAfricanAmerican());
            demographic.put(RacialCategory.HISPANIC, s.getHispanic());
            demographic.put(RacialCategory.ASIAN, s.getAsian());
            demographic.put(RacialCategory.NATIVE, s.getNativeHawaiian());
            demographic.put(RacialCategory.MIXED, s.getTwoOrMore());

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
            PrecinctDemographic p = precDemoRepository.findPrecinctDemographic(state, precinct);

            demographic.put(RacialCategory.WHITE, p.getWhite());
            demographic.put(RacialCategory.BLACK, p.getAfricanAmerican());
            demographic.put(RacialCategory.HISPANIC, p.getHispanic());
            demographic.put(RacialCategory.ASIAN, p.getAsian());
            demographic.put(RacialCategory.NATIVE, p.getNativeHawaiian());
            demographic.put(RacialCategory.MIXED, p.getTwoOrMore());

            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}

//            System.out.println(d.getWhite());
//            System.out.println(d.getAfricanAmerican());
//            System.out.println(d.getHispanic());
//            System.out.println(d.getAsian());
//            System.out.println(d.getNativeHawaiian());
//            System.out.println(d.getTwoOrMore());

//            demographic.put(RacialCategory.WHITE, 0);
//            demographic.put(RacialCategory.BLACK, 0);
//            demographic.put(RacialCategory.HISPANIC, 0);
//            demographic.put(RacialCategory.ASIAN, 0);
//            demographic.put(RacialCategory.NATIVE, 0);
//            demographic.put(RacialCategory.MIXED, 0);