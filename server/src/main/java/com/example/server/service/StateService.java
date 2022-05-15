package com.example.server.service;

import com.example.server.model.State;
import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;
import com.example.server.repository.StateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StateService {
    @Autowired
    private final StateRepository sRepository;
    private final DistrictPlanService dpService;

    public StateService(StateRepository sRepository, DistrictPlanService dpService) {
        this.sRepository = sRepository;
        this.dpService = dpService;
    }

    public List<State> getStates() {
        List<State> states = sRepository.findAll();
        for (State s : states){
//            s.setDemographic(dmService.getDemographicByStateId(s.getStateId()));
            s.setDistrictPlans(dpService.getPlansByStateId(s.getStateId()));
        }
        System.out.println("Service States ...");
        return states;
    }

    public State getStateByStateId(StateCode stateId) {
        try {
            Optional<State> s = sRepository.findById(stateId);
            if (s.isPresent()){
                // s.get().setDemographic(packDemographic(s.get()));
                s.get().setDistrictPlans(dpService.getPlansByStateId(stateId));
                System.out.println("Service State ...");
                return s.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
    /*
    compareDistrictPlans():JSON
    getBoxWhiskerPlot():BoxWhiskerPlot
     */

}
