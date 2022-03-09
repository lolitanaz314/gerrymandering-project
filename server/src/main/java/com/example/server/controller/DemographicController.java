package com.example.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.model.Demographic;
import com.example.server.repository.DemographicRepository;
//origins = "http://localhost:8080"
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DemographicController {

    @Autowired
    DemographicRepository DemographicRepository;

    @GetMapping("/demographic")
    public Iterable<Demographic> getAllDemographics() {
        return DemographicRepository.findAll();
    }
}