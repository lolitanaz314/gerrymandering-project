package com.example.server.model;

import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;

import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "State")
public class State {
    @Id
    @Column(name="state_id")
    private StateCode stateId;

    @Column(name="total_pop") // total population
    private int totalPop;

    @Transient
    @MapKeyEnumerated(EnumType.STRING)
    private Map<RacialCategory, Integer> demographic;

    @Transient
    private List<DistrictPlan> districtPlans;
}
