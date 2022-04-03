package com.example.server.controller;

import com.example.server.model.State;
import com.example.server.repository.StateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//origins = "http://localhost:8080"
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class StateController {

    @Autowired
    StateRepository StateRepository;

    @GetMapping("/state")
    public Iterable<State> getAllStates() {
        return StateRepository.findAll();
    }
}