package com.example.server.controller;

import com.example.server.service.DistrictService;
import com.example.server.enumeration.StateCode;
import com.example.server.model.District;

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
public class DistrictController {
    DistrictService dService; // DistrictService

    public DistrictController (DistrictService dService) {this.dService = dService; }

    // Test
//    @GetMapping("/api/districts")
//    public List<District> getDistricts() {
//        return dService.findAll();
//    }

    // get districts by state_id and dp_id
    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts")
    public CollectionModel<EntityModel<District>> getDistrictsByDistrictPlanId(
            @PathVariable("state_id") StateCode stateId,
            @PathVariable("dp_id") int dpId) {

        Set<EntityModel<District>> districts = dService.getDistrictsByDistrictPlanId(stateId, dpId).stream().map(d ->
                EntityModel.of(d,
                linkTo(methodOn(DistrictController.class).getDistrictById(d.getStateId(), d.getDistrictPlanId(), d.getId())).withSelfRel(),
                linkTo(methodOn(DistrictController.class).getDistrictsByDistrictPlanId(d.getStateId(), d.getDistrictPlanId())).withRel("districts")))
            .collect(Collectors.toSet());
        return CollectionModel.of(districts,
                    linkTo(methodOn(DistrictController.class).getDistrictsByDistrictPlanId(stateId, dpId)).withSelfRel());
    }

    // get districts by state_id, dp_id, and id
    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts/{id}")
    public EntityModel<District> getDistrictById(
            @PathVariable("state_id") StateCode stateId,
            @PathVariable("dp_id") int dpId,
            @PathVariable("id") int id) {

        District d = dService.getDistrictById(stateId, dpId, id);
        return EntityModel.of(d,
                linkTo(methodOn(DistrictController.class).getDistrictById               (d.getStateId(), d.getDistrictPlanId(), d.getId())).withSelfRel(),
                linkTo(methodOn(DistrictController.class).getDistrictsByDistrictPlanId  (d.getStateId(), d.getDistrictPlanId())).withRel("districts"));
    }
}