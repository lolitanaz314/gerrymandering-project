package com.example.server.service;

import com.example.server.model.DemographicDistrict;
import com.example.server.model.DemographicPrecinct;
import com.example.server.model.id.DistrictId;
import com.example.server.model.id.PrecinctId;
import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.DemographicState;
import com.example.server.repository.DemographicDistrictRepository;
import com.example.server.repository.DemographicPrecinctRepository;
import com.example.server.repository.DemographicStateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class DemographicService {
    @Autowired
    private final DemographicStateRepository stateDemoRepository;
    private final DemographicDistrictRepository distDemoRepository;
    private final DemographicPrecinctRepository precDemoRepository;

    public DemographicService(DemographicStateRepository dmRepository, DemographicDistrictRepository distDemoRepository, DemographicPrecinctRepository precDemoRepository) {
        this.stateDemoRepository = dmRepository;
        this.distDemoRepository = distDemoRepository;
        this.precDemoRepository = precDemoRepository;
    }

    // get demographic of state
    public Map<Category, Integer> getDemographicByStateId(StateCode id) {
        int state = id.ordinal();

        Map<Category, Integer> demographic = new HashMap<>();
        try {
            DemographicState demo = stateDemoRepository.findStateDemographic(state);

            demographic.put(Category.WHITE, demo.getWhite());
            demographic.put(Category.BLACK, demo.getAfricanAmerican());
            demographic.put(Category.HISPANIC, demo.getHispanic());
            demographic.put(Category.ASIAN, demo.getAsian());
            demographic.put(Category.NATIVE, demo.getNativeHawaiian());
            demographic.put(Category.MIXED, demo.getTwoOrMore());

            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of district
    public Map<Category, Integer> getDemographicByDistrictId(DistrictId id) {
        int state = id.getStateId().ordinal();
        String districtPlan = id.getPlanId();
        int district = id.getDistrictId();

        Map<Category, Integer> demographic = new HashMap<>();
        try {
            DemographicDistrict s = distDemoRepository.findDistrictDemographic(state, districtPlan, district);

            demographic.put(Category.WHITE, s.getWhite());
            demographic.put(Category.BLACK, s.getAfricanAmerican());
            demographic.put(Category.HISPANIC, s.getHispanic());
            demographic.put(Category.ASIAN, s.getAsian());
            demographic.put(Category.NATIVE, s.getNativeHawaiian());
            demographic.put(Category.MIXED, s.getTwoOrMore());
//            demographic.put(RacialCategory.DEMOCRATIC_PARTY, s.());
//            demographic.put(RacialCategory.REPUBLICAN_PARTY, s.());

            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // get demographic of precinct
    public Map<Category, Integer> getDemographicByPrecinctId(PrecinctId id) {
        int state = id.getStateId().ordinal();
        int precinct = id.getPrecinctId();

        Map<Category, Integer> demographic = new HashMap<>();
        try {
            DemographicPrecinct p = precDemoRepository.findPrecinctDemographic(state, precinct);

            demographic.put(Category.WHITE, p.getWhite());
            demographic.put(Category.BLACK, p.getAfricanAmerican());
            demographic.put(Category.HISPANIC, p.getHispanic());
            demographic.put(Category.ASIAN, p.getAsian());
            demographic.put(Category.NATIVE, p.getNativeHawaiian());
            demographic.put(Category.MIXED, p.getTwoOrMore());

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