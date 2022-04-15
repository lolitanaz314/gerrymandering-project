package com.example.server.service;

import com.example.server.enumeration.RacialCategory;
import com.example.server.enumeration.StateCode;
import com.example.server.model.Demographic;
import com.example.server.repository.DemographicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DemographicService {
    @Autowired
    private final DemographicRepository dmRepository;
    public DemographicService(DemographicRepository dmRepository) {
        this.dmRepository = dmRepository;
    }

    public Map<RacialCategory, Integer> getDemographicByStateId(StateCode id) {
        Map<RacialCategory, Integer> demographic = new HashMap<>();
        try {
            List<Demographic> s = dmRepository.findDemographicByStateIdNamedParamsNative(id);
            System.out.println(s.size());
            for (Demographic ptr : s) {
                System.out.print(ptr.getRace() + " " + ptr.getTotalPop());
                demographic.put(ptr.getRace(), ptr.getTotalPop());
            }
            return demographic;
        } catch (NoSuchElementException ex){
            return null;
        }

    }
}