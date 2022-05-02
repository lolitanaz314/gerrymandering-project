package com.example.server.service;

import com.example.server.model.BoxAndWhisker;
import com.example.server.model.BoxAndWhiskerPlot;
import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;
import com.example.server.repository.BoxAndWhiskerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BoxAndWhiskerService {
    @Autowired
    private final BoxAndWhiskerRepository bwRepository;
    private final StateService sService;

    public BoxAndWhiskerService(BoxAndWhiskerRepository bwRepository, StateService sService) {
        this.bwRepository = bwRepository;
        this.sService = sService;
    }

    public BoxAndWhiskerPlot getBoxAndWhiskerByStateId(StateCode stateId, RacialCategory demographic) {
        BoxAndWhiskerPlot boxAndWhiskerPlot = new BoxAndWhiskerPlot();
        try {
            boxAndWhiskerPlot.setRace(demographic);

            List<BoxAndWhisker> boxAndWhiskers = new ArrayList<>();
            for (int i = 1; i <= 9; i++){
                List<Double> points = bwRepository.findPoints(demographic.ordinal(), stateId.ordinal(), i);
                BoxAndWhisker bw = new BoxAndWhisker(i, points);
                boxAndWhiskers.add(bw);
            }
            boxAndWhiskerPlot.setBoxAndWhiskers(boxAndWhiskers);

            return boxAndWhiskerPlot;
        } catch (NoSuchElementException ex){
            return boxAndWhiskerPlot;
        }
    }
}

// System.out.println(demographic.ordinal() + " " + stateId.ordinal() + " " + i);
// System.out.println(demographic + " " + stateId + " " + i);
// System.out.println(district.size());