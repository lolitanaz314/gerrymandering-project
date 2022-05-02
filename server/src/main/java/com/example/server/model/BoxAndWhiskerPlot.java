package com.example.server.model;

import com.example.server.model.enumeration.RacialCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class BoxAndWhiskerPlot {
    private RacialCategory race;

    private List<BoxAndWhisker> boxAndWhiskers;
}
