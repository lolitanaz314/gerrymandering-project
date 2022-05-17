package com.example.server.service;

import com.example.server.model.SeatVoteCurveMeasures;
import com.example.server.model.State;
import com.example.server.model.enumeration.StateCode;
import com.example.server.repository.SeatVoteCurveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SeatVoteCurveService {
    @Autowired
    private final SeatVoteCurveRepository svRepository;

    public SeatVoteCurveService(SeatVoteCurveRepository svRepository) {
        this.svRepository = svRepository;
    }

    public SeatVoteCurveMeasures getSeatVoteCurve(StateCode stateId, String planId) {
        System.out.println("Service SeatVoteCurve ...");
        try {
            Optional<SeatVoteCurveMeasures> sv = svRepository.findMeasures(stateId, planId);
            if (sv.isPresent()){
                sv.get().setSeatVotePoints(svRepository.findPoints(stateId, planId));
                System.out.println("Returning SeatVoteCurve ...");
                return sv.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }
}
