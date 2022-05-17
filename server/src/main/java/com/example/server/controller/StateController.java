package com.example.server.controller;

import com.example.server.model.BoxAndWhiskerPlot;
import com.example.server.model.enumeration.Category;
import com.example.server.service.BoxAndWhiskerService;
import com.example.server.service.StateService;
import com.example.server.model.State;
import com.example.server.model.enumeration.StateCode;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class StateController {
    final StateService sService;
    final BoxAndWhiskerService bwService;
    public StateController(StateService sService, BoxAndWhiskerService bwService) {
        this.sService = sService;
         this.bwService = bwService;
    }

    @GetMapping("/states")
    public CollectionModel<EntityModel<State>> getStates() {
        System.out.println("Controller States ...");
        List<State> states = sService.getStates();
        Set<EntityModel<State>> stateSet = states.stream().map(s ->
            EntityModel.of(s,
                linkTo(methodOn(StateController.class).getStateByStateId(s.getStateId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states")))
            .collect(Collectors.toSet());
        System.out.println("Returning States ...\n");
        return CollectionModel.of(stateSet,
                linkTo(methodOn(StateController.class).getStates()).withSelfRel());
    }

    @GetMapping("/states/{state_id}")
    public EntityModel<State> getStateByStateId(@PathVariable("state_id") StateCode stateId) {
        System.out.println("Controller State ...");
        State state = sService.getStateByStateId(stateId);
        System.out.println("Returning State ...\n");
        return EntityModel.of(state,
                linkTo(methodOn(StateController.class).getStateByStateId(state.getStateId())).withSelfRel(),
                linkTo(methodOn(StateController.class).getStates()).withRel("states"));
    }

    @GetMapping("/states/{state_id}/boxAndWhisker/{demographic}")
    public EntityModel<BoxAndWhiskerPlot> getBoxAndWhiskerByStateId(@PathVariable("state_id") StateCode stateId,
                                                                    @PathVariable("demographic") String demographic) {
        System.out.println("Controller BoxAndWhiskerPlot ...");
        BoxAndWhiskerPlot bw = bwService.getBoxAndWhiskerByStateId(stateId, demographic);
        System.out.println("Returning BoxAndWhiskerPlot ...\n");
        return EntityModel.of(bw);
    }
}