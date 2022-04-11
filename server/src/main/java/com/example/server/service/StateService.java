package com.example.server.service;

import com.example.server.model.State;
import com.example.server.enumeration.StateCode;

import com.example.server.repository.StateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class StateService {
    private final StateRepository sRepository;
    public StateService(StateRepository sRepository) {
        this.sRepository = sRepository;
    }

    public List<State> findAll() {
        return sRepository.findAll();
    }

    public State getStateById(StateCode id) {
        try {
            Optional<State> s = sRepository.findById(id);
            return s.get();
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
