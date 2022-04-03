package com.example.server.controller;

import com.example.server.model.DistrictPlan;
import com.example.server.repository.DistrictPlanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//origins = "http://localhost:8080"
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DistrictPlanController {

    @Autowired
    DistrictPlanRepository DistrictPlanRepository;

    @GetMapping("/districtplan")
    public Iterable<DistrictPlan> getAllDistrictPlans() {
        return DistrictPlanRepository.findAll();
    }
}