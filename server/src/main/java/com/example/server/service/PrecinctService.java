package com.example.server.service;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.repository.PrecinctRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PrecinctService {
    @Autowired
    private final PrecinctRepository pRepository;
    public PrecinctService(PrecinctRepository pRepository) {
        this.pRepository = pRepository;
    }

    // public List<Precinct> findAll() { return pRepository.findAll(); }

    public List<Precinct> getPrecinctsByStateId(StateCode stateId) {
        return (List<Precinct>) pRepository.findByStateId(stateId);
    }

    public Precinct getPrecinctsById(StateCode stateId, int id) {
        try{
            Optional<Precinct> p = pRepository.findByStateIdAndId(stateId, id);
            return p.get();
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
