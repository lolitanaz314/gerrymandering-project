package com.example.server.controller;

import com.example.server.model.BoxAndWhiskerPlot;
import com.example.server.model.enumeration.Category;
import com.example.server.service.BoxAndWhiskerService;
import com.example.server.service.StateService;
import com.example.server.model.State;
import com.example.server.model.enumeration.StateCode;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("*")
public class StateController {
    final StateService sService;
     final BoxAndWhiskerService bwService;
    public StateController(StateService sService, BoxAndWhiskerService bwService) {
        this.sService = sService;
         this.bwService = bwService;
    }

    @GetMapping("/api/states")
    public CollectionModel<EntityModel<State>> getStates() {
        List<State> states = sService.getStates();
        Set<EntityModel<State>> stateSet = states.stream().map(s ->
            EntityModel.of(s,
                linkTo(methodOn(StateController.class).getStateByStateId(s.getStateId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states")))
            .collect(Collectors.toSet());
        return CollectionModel.of(stateSet,
                linkTo(methodOn(StateController.class).getStates()).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}")
    public EntityModel<State> getStateByStateId(@PathVariable("state_id") StateCode stateId) {
        State state = sService.getStateByStateId(stateId);
        return EntityModel.of(state,
                linkTo(methodOn(StateController.class).getStateByStateId(state.getStateId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states"));
    }

    @GetMapping("/api/states/{state_id}/box-and-whisker/{demographic}")
    public EntityModel<BoxAndWhiskerPlot> getBoxAndWhiskerByStateId(@PathVariable("state_id") StateCode stateId,
                                                                    @PathVariable("demographic") Category demographic) {
        return EntityModel.of(bwService.getBoxAndWhiskerByStateId(stateId, demographic));
    }
}