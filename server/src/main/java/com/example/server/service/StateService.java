package com.example.server.service;

import com.example.server.model.State;
import com.example.server.model.enumeration.StateCode;
import com.example.server.repository.StateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class StateService {
    @Autowired
    private final StateRepository sRepository;
    private final DistrictPlanService dpService;
    private final DemographicService dmService;
    public StateService(StateRepository sRepository, DistrictPlanService dpService, DemographicService dmService) {
        this.sRepository = sRepository;
        this.dpService = dpService;
        this.dmService = dmService;
    }

    public List<State> getStates() {
        List<State> states = sRepository.findAll();
        for (State s : states){
            s.setDemographic(dmService.getDemographicByStateId(s.getStateId()));
            s.setDistrictPlans(dpService.getPlansByStateId(s.getStateId()));
        }
        return states;
    }

    public State getStateByStateId(StateCode stateId) {
        try {
            Optional<State> s = sRepository.findById(stateId);
            if (s.isPresent()){
                s.get().setDemographic(dmService.getDemographicByStateId(stateId));
                s.get().setDistrictPlans(dpService.getPlansByStateId(stateId));
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
