package com.example.server.controller;

import com.example.server.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.service.PrecinctService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class PrecinctController {
    PrecinctService pService;
    public PrecinctController (PrecinctService pService) {this.pService = pService; }

    // Test
    @GetMapping("/api/precincts")
    public List<Precinct> getPrecincts() {
        return pService.findAll();
    }

    // Get precincts by state_id
    @GetMapping("/api/states/{state_id}/precincts")
    public CollectionModel<EntityModel<Precinct>> getPrecinctsByStateId(
        @PathVariable("state_id") StateCode stateId) {

        Set<EntityModel<Precinct>> precincts = pService.getPrecinctsByStateId(stateId).stream().map(precinct ->
                EntityModel.of(precinct,
                        linkTo(methodOn(PrecinctController.class).getPrecinctsById(precinct.getStateId(), precinct.getId())).withSelfRel(),
                        linkTo(methodOn(PrecinctController.class).getPrecinctsByStateId(precinct.getStateId())).withRel("precincts")))
                .collect(Collectors.toSet());
        return CollectionModel.of(precincts,
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateId(stateId)).withSelfRel());
    }

    // Get precinct by state_id and id
    @GetMapping("/api/states/{state_id}/precincts/{id}")
    public EntityModel<Precinct> getPrecinctsById(
            @PathVariable("state_id") StateCode stateId,
            @PathVariable("id") int id) {
        Precinct p = pService.getPrecinctsById(stateId, id);
        return EntityModel.of(p,
                linkTo(methodOn(PrecinctController.class).getPrecinctsById(p.getStateId(), p.getId())).withSelfRel(),
                linkTo(methodOn(PrecinctController.class).getPrecinctsByStateId(p.getStateId())).withRel("precincts"));
    }
}