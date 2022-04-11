package com.example.server.model;

import com.example.server.enumeration.StateCode;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
// @RequiredArgsConstructor
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
    // @Column(name = "demographic")
    private int[] demographic;

    @Transient
    // @Column(name = "districtPlans")
    private List<DistrictPlan> districtPlans;

    // getters
//    public StateCode getId() {
//        return id;
//    }

}
