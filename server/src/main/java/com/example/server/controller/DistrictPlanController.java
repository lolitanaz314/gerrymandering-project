package com.example.server.controller;

//import com.example.server.json.DistrictPlanJson;
//import com.example.server.json.User;
import com.example.server.model.SeatVoteCurveMeasures;
import com.example.server.service.DistrictPlanService;
import com.example.server.model.DistrictPlan;
import com.example.server.model.enumeration.StateCode;

import com.example.server.service.SeatVoteCurveService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class DistrictPlanController {
    final DistrictPlanService dpService;
    final SeatVoteCurveService svService;
    public DistrictPlanController(DistrictPlanService dpService, SeatVoteCurveService svService) {
        this.dpService = dpService;
        this.svService = svService;
    }

    // Test
    /* @GetMapping("/api/districtPlans")
    public List<DistrictPlan> getDistrictPlans() { return dpService.findAll(); }*/

    @GetMapping("/states/{state_id}/districtPlans")
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

    @GetMapping("/states/{state_id}/districtPlans/{dp_id}")
    public EntityModel<DistrictPlan> getPlanByStateIdAndDistrictId(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") String planId) {
        System.out.println("Controller districtPlan ...");
        DistrictPlan districtPlan = dpService.getPlanByStateIdAndDistrictId(stateId, planId);
        System.out.println("Returning districtPlan ...\n");
        return EntityModel.of(districtPlan,
                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(districtPlan.getStateId(), districtPlan.getPlanId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(districtPlan.getStateId())).withRel("districtPlans"));
    }

    @GetMapping("/states/{state_id}/seatVoteCurve/{dp_id}")
    public EntityModel<SeatVoteCurveMeasures> getSeatVoteCurve(@PathVariable("state_id") StateCode stateId, @PathVariable("dp_id") String planId){
        System.out.println("Controller seatVoteCurve ...");
        SeatVoteCurveMeasures seatVote = svService.getSeatVoteCurve(stateId, planId);
        System.out.println("Returning seatVoteCurve ...\n");
        return EntityModel.of(seatVote);
    }

//    @GetMapping("/api/states/{state_id}/districtPlans/{dp_id1}/{dp_id2}")
//    public CollectionModel<EntityModel<DistrictPlan>> comparePlans(
//            @PathVariable("state_id") StateCode stateId, @PathVariable("dp_id1") String planId1, @PathVariable("dp_id2") String planId2) {
//        System.out.println("Controller comparePlans ...");
//        DistrictPlan districtPlan1 = dpService.getPlanByStateIdAndDistrictId(stateId, planId1);
//        DistrictPlan districtPlan2 = dpService.getPlanByStateIdAndDistrictId(stateId, planId2);
//
//        List<DistrictPlan> twoPlans = new ArrayList<>();
//        twoPlans.add(districtPlan1);
//        twoPlans.add(districtPlan2);
//
//        List<EntityModel<DistrictPlan>> twoPlansList = twoPlans.stream().map(dp ->
//            EntityModel.of(dp,
//                linkTo(methodOn(DistrictPlanController.class).getPlanByStateIdAndDistrictId(dp.getStateId(), dp.getPlanId())).withSelfRel(),
//                linkTo(methodOn(DistrictPlanController.class).getPlansByStateId(dp.getStateId())).withRel("districtPlans")))
//            .collect(Collectors.toList());
//
//        System.out.println("Returning comparePlans ...\n");
//        return CollectionModel.of(twoPlansList);
//    }

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
