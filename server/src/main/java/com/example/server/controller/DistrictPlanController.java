package com.example.server.controller;

import com.example.server.json.DistrictPlanJson;
import com.example.server.json.User;
import com.example.server.service.DistrictPlanService;
import com.example.server.model.DistrictPlan;
import com.example.server.model.enumeration.StateCode;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
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
        System.out.println("Controller districtPlans ...");
        List<DistrictPlan> districtPlans = dpService.getPlansByStateId(stateId);
        List<EntityModel<DistrictPlan>> districtPlanList = districtPlans.stream().map(dp ->
            EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(dp.getStateId(), dp.getPlanId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(dp.getStateId())).withRel("districtPlans")))
            .collect(Collectors.toList());
        System.out.println("Returning districtPlans ...\n");
        return CollectionModel.of(districtPlanList,
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(stateId)).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id}")
    public EntityModel<DistrictPlan> getPlanByStateIdAndDistrictId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") String planId) {
        System.out.println("Controller districtPlan ...");
        DistrictPlan districtPlan = dpService.getPlanByStateIdAndDistrictId(stateId, planId);
        System.out.println("Returning districtPlan ...\n");
        return EntityModel.of(districtPlan,
                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(districtPlan.getStateId(), districtPlan.getPlanId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(districtPlan.getStateId())).withRel("districtPlans"));
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id1}/{dp_id2}")
    public CollectionModel<EntityModel<DistrictPlan>> comparePlans(
            @PathVariable("state_id") StateCode stateId, @PathVariable("dp_id1") String planId1, @PathVariable("dp_id2") String planId2) {
        System.out.println("Controller comparePlans ...");
        DistrictPlan districtPlan1 = dpService.getPlanByStateIdAndDistrictId(stateId, planId1);
        DistrictPlan districtPlan2 = dpService.getPlanByStateIdAndDistrictId(stateId, planId2);

        List<DistrictPlan> twoPlans = new ArrayList<>();
        twoPlans.add(districtPlan1);
        twoPlans.add(districtPlan2);

        List<EntityModel<DistrictPlan>> twoPlansList = twoPlans.stream().map(dp ->
            EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(dp.getStateId(), dp.getPlanId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(dp.getStateId())).withRel("districtPlans")))
            .collect(Collectors.toList());

        System.out.println("Returning comparePlans ...\n");
        return CollectionModel.of(twoPlansList);
    }

//    @GetMapping("/api/states/{state_id}/districtPlansJson/{id}")
//    public EntityModel<List<DistrictPlanJson>> list(@PathVariable("state_id") StateCode stateId, @PathVariable("id") int id) {
//        ObjectMapper mapper = new ObjectMapper();
//        TypeReference<List<DistrictPlanJson>> typeReference = new TypeReference<List<DistrictPlanJson>>(){};
//        InputStream inputStream = TypeReference.class.getResourceAsStream("/json/districtPlan.json");
//
//        try {
//            List<DistrictPlanJson> lists = mapper.readValue(inputStream,typeReference);
//            return EntityModel.of(lists);
//        } catch (IOException e){
//            System.out.println("Unable to save input: " + e.getMessage());
//            return null;
//        }
//    }
}
