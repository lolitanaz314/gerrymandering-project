package com.example.server.controller;

import com.example.server.service.DemographicService;
import com.example.server.service.DistrictPlanService;
import com.example.server.service.StateService;
import com.example.server.model.State;
import com.example.server.enumeration.StateCode;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@CrossOrigin("*")
public class StateController {
    final StateService sService;            // StateService
    final DistrictPlanService dpService;    // DistrictPlanService
    final DemographicService dmService;

    public StateController (StateService sService, DistrictPlanService dpService, DemographicService dmService) {
        this.sService = sService;
        this.dpService = dpService;
        this.dmService = dmService;
    }

    @GetMapping("/api/states")
    CollectionModel<EntityModel<State>> getStates() {

        // Get info for each state
        List<State> states = sService.findAll();
        for (State s : states){
            s.setDemographic(dmService.getDemographicByStateId(s.getId()));
            s.setDistrictPlans(dpService.getDistrictPlansByStateId(s.getId()));
        }

        // Add return links
        Set<EntityModel<State>> statesSet = states.stream().map(s ->
                EntityModel.of(s,
                linkTo(methodOn(StateController.class).getStateById(s.getId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states")))
        .collect(Collectors.toSet());
        return CollectionModel.of(statesSet,
                linkTo(methodOn(StateController.class).getStates()).withSelfRel());
    }

    @GetMapping("/api/states/{id}")
    EntityModel<State> getStateById(
            @PathVariable("id") StateCode id) {

        // Get info of chosen state
        State s = sService.getStateById(id);
        s.setDemographic(dmService.getDemographicByStateId(id));
        s.setDistrictPlans(dpService.getDistrictPlansByStateId(id));

        // Add return links
        return EntityModel.of(s,
                linkTo(methodOn(StateController.class).getStateById(id)).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states"));
    }
}