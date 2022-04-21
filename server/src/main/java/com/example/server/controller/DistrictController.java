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
//    @GetMapping("/api/districts")
//    public List<District> getDistricts() {
//        return dService.findAll();
//    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts")
    public CollectionModel<EntityModel<District>> getDistrictsByPlanId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") int dpId) {
        Set<District> districts = dService.getDistrictsByPlanId(stateId, dpId);
        Set<EntityModel<District>> districtSet = assembleDistricts(districts);
        return CollectionModel.of(districtSet,
                linkTo(methodOn(DistrictController.class).getDistrictsByPlanId(stateId, dpId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}/districts/{id}")
    public EntityModel<District> getDistrictByPlanIdAndDistrictId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") int dpId, @PathVariable("id") int id) {
        District d = dService.getDistrictByPlanIdAndDistrictId(stateId, dpId, id);
        return assembleDistrict(d);
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