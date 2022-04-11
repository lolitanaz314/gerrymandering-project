package com.example.server.controller;

import com.example.server.service.StateService;
import com.example.server.model.State;
import com.example.server.enumeration.StateCode;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class StateController {
    private final StateService sService;    // StateService
    public StateController (StateService sService) {
        this.sService = sService;
    }

    @GetMapping("/api/states")
    CollectionModel<EntityModel<State>> getStates() {
//        Set<EntityModel<State>> states = sService.findAll().stream().map(EntityModel::of).collect(Collectors.toSet());
//        return CollectionModel.of(states);

        // With return links
        Set<EntityModel<State>> states = sService.findAll().stream().map(state ->
                EntityModel.of(state,
                linkTo(methodOn(StateController.class).getStateById(state.getId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states")))
        .collect(Collectors.toSet());
        return CollectionModel.of(states,
                linkTo(methodOn(StateController.class).getStates()).withSelfRel());

    }

    @GetMapping("/api/states/{id}")
    EntityModel<State> getStateById(
            @PathVariable("id") StateCode id) {
//        State state = sService.getStateById(id);
//        return EntityModel.of(state);

        // With return links
        State s = sService.getStateById(id);
        return EntityModel.of(s,
                linkTo(methodOn(StateController.class).getStateById(id)).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states"));
    }
}