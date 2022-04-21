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

    public List<State> findAll() {
        List<State> states = sRepository.findAll();
        for (State s : states){
            s.setDemographic(dmService.getDemographicByStateId(s.getId()));
            s.setDistrictPlans(dpService.getDistrictPlansByStateId(s.getId()));
        }
        return states;
    }

    public State getStateById(StateCode id) {
        try {
            Optional<State> s = sRepository.findById(id);
            if (s.isPresent()){
                s.get().setDemographic(dmService.getDemographicByStateId(id));
                s.get().setDistrictPlans(dpService.getDistrictPlansByStateId(id));
                return s.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
//    + compareDistrictPlans():JSON
//    + getBoxWhiskerPlot():BoxWhiskerPlot
}
