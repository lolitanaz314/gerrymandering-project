package com.example.server.controller;

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

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@CrossOrigin("*")
public class StateController {
    final StateService sService;

    public StateController (StateService sService) {
        this.sService = sService;
    }

    @GetMapping("/api/states")
    CollectionModel<EntityModel<State>> getStates() {
        List<State> states = sService.findAll();
        Set<EntityModel<State>> stateSet = assembleStates(states);
        return CollectionModel.of(stateSet,
                linkTo(methodOn(StateController.class).getStates()).withSelfRel());
    }

    @GetMapping("/api/states/{id}")
    EntityModel<State> getStateById(@PathVariable("id") StateCode id) {
        State state = sService.getStateById(id);
        return assembleState(state);
    }

    public Set<EntityModel<State>> assembleStates(List<State> states){
        return states.stream().map(s ->
                EntityModel.of(s,
                linkTo(methodOn(StateController.class).getStateById(s.getId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states")))
                .collect(Collectors.toSet());
    }

    public EntityModel<State> assembleState(State state){
        return EntityModel.of(state,
                linkTo(methodOn(StateController.class).getStateById(state.getId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states"));
    }
}