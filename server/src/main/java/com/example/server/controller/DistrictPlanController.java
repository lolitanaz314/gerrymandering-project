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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("*")
public class DistrictPlanController {
    final DistrictPlanService dpService;
    public DistrictPlanController (DistrictPlanService dpService) {this.dpService = dpService; }

    // Test
    /* @GetMapping("/api/districtPlans")
    public List<DistrictPlan> getDistrictPlans() { return dpService.findAll(); }*/

    @GetMapping("/api/states/{state_id}/districtPlans")
    public CollectionModel<EntityModel<DistrictPlan>> getPlansByStateId(@PathVariable("state_id") StateCode stateId) {
        List<DistrictPlan> districtPlans = dpService.getPlansByStateId(stateId);
        List<EntityModel<DistrictPlan>> districtPlanList = assembleDistrictPlans(districtPlans);
        return CollectionModel.of(districtPlanList,
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(stateId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}")
    public EntityModel<DistrictPlan> getPlanByStateIdAndDistrictId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") int planId) {
        DistrictPlan districtPlan = dpService.getPlanByStateIdAndDistrictId(stateId, planId);
        return assembleDistrictPlan(districtPlan);
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id1}/{dp_id2}")
    public CollectionModel<EntityModel<DistrictPlan>> comparePlans(
            @PathVariable("state_id") StateCode stateId, @PathVariable("dp_id1") int planId1, @PathVariable("dp_id2") int planId2) {
        DistrictPlan districtPlan1 = dpService.getPlanByStateIdAndDistrictId(stateId, planId1);
        DistrictPlan districtPlan2 = dpService.getPlanByStateIdAndDistrictId(stateId, planId2);

        List<DistrictPlan> twoPlans = new ArrayList<>();
        twoPlans.add(districtPlan1);
        twoPlans.add(districtPlan2);

        List<EntityModel<DistrictPlan>> twoPlansList = assembleDistrictPlans(twoPlans);
        return CollectionModel.of(twoPlansList,
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(stateId)).withSelfRel());
    }

    public List<EntityModel<DistrictPlan>> assembleDistrictPlans(List<DistrictPlan> districtPlans){
        return districtPlans.stream().map(dp ->
                EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(dp.getStateId(), dp.getPlanId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(dp.getStateId())).withRel("districtPlans")))
                .collect(Collectors.toList());
    }

    public EntityModel<DistrictPlan> assembleDistrictPlan(DistrictPlan dp){
        return EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(dp.getStateId(), dp.getPlanId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(dp.getStateId())).withRel("districtPlans"));
    }
}
