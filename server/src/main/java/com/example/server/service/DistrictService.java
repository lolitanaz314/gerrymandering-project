package com.example.server.service;

import com.example.server.enumeration.StateCode;
import com.example.server.model.District;
import com.example.server.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class DistrictService {
    @Autowired
    private final DistrictRepository dRepository;
    public DistrictService(DistrictRepository dRepository) {
        this.dRepository = dRepository;
    }

    // public List<District> findAll() {return dRepository.findAll(); }

    public List<District> getDistrictsByDistrictPlanId(StateCode stateId, int dpId){
        return (List<District>) dRepository.findByStateIdAndDistrictPlanId(stateId, dpId);
    }

    public District getDistrictById(StateCode stateId, int dpId, int id) {
        try{
            Optional<District> dp = dRepository.findByStateIdAndDistrictPlanIdAndId(stateId, dpId, id);
            return dp.get();
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
