package com.example.server.controller;

import com.example.server.service.DistrictService;
import com.example.server.model.enumeration.StateCode;
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

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("*")
public class DistrictController {
    final DistrictService dService;
    public DistrictController (DistrictService dService) {this.dService = dService; }

    // Test
    @GetMapping("/api/districts")
    public List<District> getDistricts() {
        return dService.findAll();
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts")
    public CollectionModel<EntityModel<District>> getDistrictsByPlanId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") int planId) {
        Set<District> districts = dService.getDistrictsByPlanId(stateId, planId);
        Set<EntityModel<District>> districtSet = assembleDistricts(districts);
        return CollectionModel.of(districtSet,
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(stateId, planId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts/{id}")
    public EntityModel<District> getDistrictByPlanIdAndDistrictId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") int planId, @PathVariable("id") int districtId) {
        District district = dService.getDistrictByPlanIdAndDistrictId(stateId, planId, districtId);
        return assembleDistrict(district);
    }

    public Set<EntityModel<District>> assembleDistricts(Set<District> districts){
        return districts.stream().map(d ->
                EntityModel.of(d,
                linkTo(methodOn(DistrictController.class).getDistrictByPlanIdAndDistrictId(d.getStateId(), d.getDistrictPlanId(), d.getId())).withSelfRel(),
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(d.getStateId(), d.getDistrictPlanId())).withRel("districts")))
                .collect(Collectors.toSet());
    }

    public EntityModel<District> assembleDistrict(District d){
        return EntityModel.of(d,
                linkTo(methodOn(DistrictController.class).getDistrictByPlanIdAndDistrictId(d.getStateId(), d.getDistrictPlanId(), d.getId())).withSelfRel(),
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(d.getStateId(), d.getDistrictPlanId())).withRel("districts"));
    }
}