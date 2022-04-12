package com.example.server.model;

import com.example.server.enumeration.StateCode;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "state")
public class State {
    @Id
    @Column(name = "id")
    private StateCode id;

    @Column(name = "total_pop") // total population
    private int totalPop;

    @Transient
    private int[] demographic;

    @Transient
    private List<DistrictPlan> districtPlans;
}
