package com.example.server.controller;

import com.example.server.model.District;
import com.example.server.repository.DistrictRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//origins = "http://localhost:8080"
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DistrictController {

    @Autowired
    DistrictRepository DistrictRepository;

    @GetMapping("/district")
    public Iterable<District> getAllDistricts() {
        return DistrictRepository.findAll();
    }
}