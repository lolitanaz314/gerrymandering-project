package com.example.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.model.table;
import com.example.server.repository.tableRepository;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin

public class tableController {
    @Autowired
    private tableRepository tC;

    @GetMapping("/table")
    public List<table> getAllEntrees() {
        return tC.findAll();
    }
}
