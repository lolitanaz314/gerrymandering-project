package com.example.server.controller;

import com.example.server.model.Precinct;
import com.example.server.repository.PrecinctRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//origins = "http://localhost:8080"
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class PrecinctController {

    @Autowired
    PrecinctRepository PrecinctRepository;

    @GetMapping("/precinct")
    public Iterable<Precinct> getAllPrecincts() {
        return PrecinctRepository.findAll();
    }
}