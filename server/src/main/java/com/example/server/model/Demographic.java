package com.example.server.model;

import com.example.server.enumeration.RacialCategory;
import com.example.server.enumeration.StateCode;
import com.example.server.id.DemographicId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "demographic")
@IdClass(DemographicId.class)
public class Demographic {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Column(name="district_plan_id", nullable = true)
    private Integer districtPlanId;

    @Column(name="district_id", nullable = true)
    private Integer districtId;

    @Column(name="precinct_id", nullable = true)
    private Integer precinctId;

    @Id
    @Column(name="race", nullable = false)
    private RacialCategory race;

    @Column(name = "total_pop", nullable = false) // total population
    private int totalPop;
}