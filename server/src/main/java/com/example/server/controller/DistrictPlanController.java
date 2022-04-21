package com.example.server.controller;

import com.example.server.service.DistrictPlanService;
import com.example.server.model.DistrictPlan;
import com.example.server.model.enumeration.StateCode;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@CrossOrigin("*")
public class DistrictPlanController {
    DistrictPlanService dpService; // DistrictPlanService

    public DistrictPlanController (DistrictPlanService dpService) {this.dpService = dpService; }

    // Test
//    @GetMapping("/api/districtPlans")
//    List<DistrictPlan> getDistrictPlans() {
//        return dpService.findAll();
//    }

    @GetMapping("/api/states/{state_id}/districtPlans")
    CollectionModel<EntityModel<DistrictPlan>> getDistrictPlansByStateId(@PathVariable("state_id") StateCode stateId) {
        List<DistrictPlan> districtPlans = dpService.getDistrictPlansByStateId(stateId);
        List<EntityModel<DistrictPlan>> districtPlanList = assembleDistrictPlans(districtPlans);
        return CollectionModel.of(districtPlanList,
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlansByStateId(stateId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{id}")
    EntityModel<DistrictPlan> getDistrictPlanById(@PathVariable("state_id") StateCode stateId, @PathVariable("id") int id) {
        DistrictPlan dp = dpService.getDistrictPlanById(stateId, id);
        return assembleDistrictPlan(dp);
    }

    public List<EntityModel<DistrictPlan>> assembleDistrictPlans(List<DistrictPlan> districtPlans){
        return districtPlans.stream().map(dp ->
                EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlanById(dp.getStateId(), dp.getId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlansByStateId(dp.getStateId())).withRel("districtPlans")))
                .collect(Collectors.toList());
    }

    public EntityModel<DistrictPlan> assembleDistrictPlan(DistrictPlan dp){
        return EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlanById(dp.getStateId(), dp.getId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlansByStateId(dp.getStateId())).withRel("districtPlans"));
    }
}
