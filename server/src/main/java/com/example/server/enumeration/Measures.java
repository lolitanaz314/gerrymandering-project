package com.example.server.enumeration;

// MCMC shows :
// >> estimated political splits
// >> estimated majority-minority districts

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
