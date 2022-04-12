package com.example.server.model;

// MCMC shows :
// >> estimated political splits
// >> estimated majority-minority districts

import com.example.server.enumeration.MeasureType;

import javax.persistence.EnumType;
import javax.persistence.MapKeyEnumerated;
import java.util.Map;

public class Measures {
    @MapKeyEnumerated(EnumType.STRING)
    private Map<MeasureType, Double> districtingMeasures;

    public double getMeasureForDistrictPlan(MeasureType type) {
        return this.districtingMeasures.get(type);
    }
}
