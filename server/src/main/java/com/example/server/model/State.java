package com.example.server.model;

import com.example.server.enumeration.RacialCategory;
import com.example.server.enumeration.StateCode;

import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "state")
public class State {
    @Id
    @Column(name = "id")
    private StateCode id;

    @Column(name = "total_pop") // total population
    private int totalPop;

    @Transient
    // private int[] demographic;
    @MapKeyEnumerated(EnumType.STRING)
    private Map<RacialCategory, Integer> demographic;

    @Transient
    private List<DistrictPlan> districtPlans;
}
