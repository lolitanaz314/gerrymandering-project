package com.example.server.service;

import com.example.server.id.DistrictId;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.District;
import com.example.server.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class DistrictService {
    @Autowired
    private final DistrictRepository dRepository;
    // private final PrecinctService pService;
    private final DemographicService dmService;
    public DistrictService(DistrictRepository dRepository, PrecinctService pService, DemographicService dmService) {
        this.dRepository = dRepository;
        // this.pService = pService;
        this.dmService = dmService;
    }

    // public List<District> findAll() {return dRepository.findAll(); }

    public Set<District> getDistrictsByDistrictPlanId(StateCode stateId, int dpId){
        Set<District> districts = dRepository.findByStateIdAndDistrictPlanId(stateId, dpId);
        for (District d : districts){
            d.setDemographic(dmService.getDemographicByDistrictId(new DistrictId(d.getId(), dpId, stateId)));
            // d.setPrecincts(pService.get(dp.getStateId(), dp.getId()));
        }
        return districts;
    }

    public District getDistrictById(StateCode stateId, int dpId, int id) {
        try{
            Optional<District> d = dRepository.findByStateIdAndDistrictPlanIdAndId(stateId, dpId, id);
            if(d.isPresent()){
                d.get().setDemographic(dmService.getDemographicByDistrictId(new DistrictId(id, dpId, stateId)));
                return d.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
//    +getCompactnessMeasure(): double
//    +isMajorityMinorityDistrict(): boolean
//    +isCompetitiveDistrict(): boolean
//    +getWastedVotes(): int[]
}
