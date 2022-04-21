package com.example.server.service;

import com.example.server.model.id.PrecinctId;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.repository.PrecinctRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class PrecinctService {
    @Autowired
    private final PrecinctRepository pRepository;
    private final DemographicService dmService;
    public PrecinctService(PrecinctRepository pRepository, DemographicService dmService) {
        this.pRepository = pRepository;
        this.dmService = dmService;
    }

    // public List<Precinct> findAll() { return pRepository.findAll(); }

    public Set<Precinct> getPrecinctsByStateId(StateCode stateId) {
        Set<Precinct> precincts = pRepository.findByStateId(stateId);
        for (Precinct p : precincts){
            p.setDemographic(dmService.getDemographicByPrecinctId(new PrecinctId(stateId, p.getId())));
        }
        return precincts;
    }

    public Precinct getPrecinctsById(StateCode stateId, int id) {
        try{
            Optional<Precinct> p = pRepository.findByStateIdAndId(stateId, id);
            if(p.isPresent()){
                p.get().setDemographic(dmService.getDemographicByPrecinctId(new PrecinctId(stateId, id)));
                return p.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
