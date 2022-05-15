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
    /* @GetMapping("/api/districts")
    public List<District> getDistricts() { return dService.findAll(); }*/

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts")
    public CollectionModel<EntityModel<District>> getDistrictsByPlanId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") String planId) {
        Set<District> districts = dService.getDistrictsByPlanId(stateId, planId);
        Set<EntityModel<District>> districtSet = districts.stream().map(d ->
            EntityModel.of(d,
                linkTo(methodOn(DistrictController.class).getDistrictByPlanIdAndDistrictId(d.getStateId(), d.getPlanId(), d.getDistrictId())).withSelfRel(),
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(d.getStateId(), d.getPlanId())).withRel("districts")))
            .collect(Collectors.toSet());
        System.out.println("Controller Districts ...\n");
        return CollectionModel.of(districtSet,
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(stateId, planId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts/{id}")
    public EntityModel<District> getDistrictByPlanIdAndDistrictId(
            @PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") String planId, @PathVariable("id") int districtId) {
        District district = dService.getDistrictByPlanIdAndDistrictId(stateId, planId, districtId);
        System.out.println("Controller District ...\n");
        return EntityModel.of(district,
                linkTo(methodOn(DistrictController.class).getDistrictByPlanIdAndDistrictId(district.getStateId(), district.getPlanId(), district.getDistrictId())).withSelfRel(),
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(district.getStateId(), district.getPlanId())).withRel("districts"));
    }
}