package com.example.server.service;

import com.example.server.model.BoxAndWhisker;
import com.example.server.model.BoxAndWhiskerData;
import com.example.server.model.BoxAndWhiskerPlot;
import com.example.server.model.enumeration.Category;
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

    public BoxAndWhiskerPlot getBoxAndWhiskerByStateId(StateCode stateId, String demographic) {

        // String conversion from client to db

        BoxAndWhiskerPlot boxAndWhiskerPlot = new BoxAndWhiskerPlot();
        System.out.println("Service boxAndWhisker ...");
        System.out.println("Demographic: " + demographic);
        try {
            boxAndWhiskerPlot.setDemographic(demographic);

            // TODO: make change to this block
            List<BoxAndWhiskerData> data = bwRepository.findPoints(demographic, stateId.ordinal());
            List<BoxAndWhisker> boxAndWhiskers = new ArrayList<>();
            for (BoxAndWhiskerData datum : data) {
                String id = Integer.toString(datum.getDistrictId());
//                String id = datum.getDistrictPlanId();
                double[] points = new double[]{datum.getMin(), datum.getQ1(),
                        datum.getMed(), datum.getQ3(), datum.getMax()};
                BoxAndWhisker bw = new BoxAndWhisker(id, points);
                boxAndWhiskers.add(bw);
            }
            System.out.println("Returning boxAndWhisker ...");
            System.out.println("Size: " + boxAndWhiskers.size());
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