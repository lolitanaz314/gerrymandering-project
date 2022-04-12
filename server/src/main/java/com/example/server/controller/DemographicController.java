// EDITING needed
package com.example.server.controller;

import com.example.server.model.Demographic;
import com.example.server.repository.DemographicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class DemographicController {

    @Autowired
    DemographicRepository dRepository;

    @GetMapping("/api/demographic")
    public List<Demographic> getAllDemographics() {
        return dRepository.findAll();
    }
}