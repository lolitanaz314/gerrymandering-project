package com.example.server.service;

import com.example.server.model.District;
import com.example.server.model.enumeration.Category;
import com.example.server.model.id.PrecinctId;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.Precinct;
import com.example.server.repository.PrecinctRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PrecinctService {
    @Autowired
    private final PrecinctRepository pRepository;
//    private final DemographicService dmService;

    public PrecinctService(PrecinctRepository pRepository) {
        this.pRepository = pRepository;
    }

    // public List<Precinct> findAll() { return pRepository.findAll(); }

    public Set<Precinct> getPrecinctsByStateId(StateCode stateId) {
        Set<Precinct> precincts = pRepository.findByStateId(stateId);
        for (Precinct p : precincts){
            p.setDemographic(packDemographic(p));
        }
        System.out.println("Service precincts ...");
        return precincts;
    }

    public Precinct getPrecinctsByStateIdAndPrecinctId(StateCode stateId, int precinctId) {
        try{
            Optional<Precinct> p = pRepository.findByStateIdAndPrecinctId(stateId, precinctId);
            if(p.isPresent()){
                p.get().setDemographic(packDemographic(p.get()));
                System.out.println("Service precinct ...");
                return p.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    public Map<Category, Integer> packDemographic(Precinct p) {
        Map<Category, Integer> demographic = new HashMap<>();
        try {
            demographic.put(Category.WHITE, p.getWhite());
            demographic.put(Category.BLACK, p.getAfricanAmerican());
            demographic.put(Category.HISPANIC, p.getHispanic());
            demographic.put(Category.ASIAN, p.getAsian());
            demographic.put(Category.NATIVE, p.getNativeHawaiian());
            demographic.put(Category.MIXED, p.getTwoOrMore());
//            System.out.println("SIZE: " + demographic.size());
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
