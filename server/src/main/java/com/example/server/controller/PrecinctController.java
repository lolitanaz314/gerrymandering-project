package com.example.server.controller;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.service.PrecinctService;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("*")
public class PrecinctController {
    final PrecinctService pService;
    public PrecinctController (PrecinctService pService) {this.pService = pService; }

    // Test
    /* @GetMapping("/api/precincts")
    public List<Precinct> getPrecincts() { return pService.findAll(); }*/

    @GetMapping("/api/states/{state_id}/precincts")
    public CollectionModel<EntityModel<Precinct>> getPrecinctsByStateId(@PathVariable("state_id") StateCode stateId) {
        System.out.println("Controller Precincts ...");
        Set<Precinct> precincts = pService.getPrecinctsByStateId(stateId);
        Set<EntityModel<Precinct>> precinctSet = precincts.stream().map(p ->
            EntityModel.of(p,
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateIdAndPrecinctId(p.getStateId(), p.getPrecinctId())).withSelfRel(),
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateId(p.getStateId())).withRel("precincts")))
            .collect(Collectors.toSet());
        System.out.println("Returning Precincts ...\n");
        return CollectionModel.of(precinctSet,
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateId(stateId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/precincts/{id}")
    public EntityModel<Precinct> getPrecinctsByStateIdAndPrecinctId(@PathVariable("state_id") StateCode stateId, @PathVariable("id") int precinctId) {
        System.out.println("Controller Precinct ...");
        Precinct precinct = pService.getPrecinctsByStateIdAndPrecinctId(stateId, precinctId);
        System.out.println("Returning Precinct ...\n");
        return EntityModel.of(precinct,
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateIdAndPrecinctId(precinct.getStateId(), precinct.getPrecinctId())).withSelfRel(),
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateId(precinct.getStateId())).withRel("precincts"));
    }
}