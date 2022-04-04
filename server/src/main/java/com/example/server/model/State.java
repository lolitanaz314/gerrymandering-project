package com.example.server.model;

import java.util.Collection;
import java.util.List;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "state")
public class State {
    @Id
    @Column(name="state_name")
    private StateCode stateName;

    @Column(name = "total_population")
    private int totalPopulation;

    @Transient
    @Column(name = "demographic")
    private List<Tuple> demographic;

    @Transient
    private List<DistrictPlan> districtPlans;

    // boxWhiskerData: BoxAndWhiskerData
    // seaWulfPlansSummary: JSON
}