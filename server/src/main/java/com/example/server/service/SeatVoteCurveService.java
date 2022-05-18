package com.example.server.service;

import com.example.server.model.SeatVoteCurveMeasures;
import com.example.server.model.enumeration.StateCode;
import com.example.server.repository.SeatVoteMeasureRepository;
import com.example.server.repository.SeatVotePointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SeatVoteCurveService {
    @Autowired
    private final SeatVoteMeasureRepository svmRepository;
    private final SeatVotePointsRepository svpRepository;

    public SeatVoteCurveService(SeatVoteMeasureRepository svRepository, SeatVotePointsRepository svpRepository) {
        this.svmRepository = svRepository;
        this.svpRepository = svpRepository;
    }

    public SeatVoteCurveMeasures getSeatVoteCurve(StateCode stateId, String planId) {
        System.out.println("Service SeatVoteCurve ..." + stateId + " " + planId);
        try {
            Optional<SeatVoteCurveMeasures> sv = svmRepository.findMeasures(stateId.ordinal(), planId);
            if (sv.isPresent()){
                sv.get().setSeatVotePoints(svpRepository.findPoints(stateId.ordinal(), planId));
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
