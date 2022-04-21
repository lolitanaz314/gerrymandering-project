package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.enumeration.Status;

import com.example.server.model.id.DistrictPlanId;
import lombok.*;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district_plan")
@IdClass(DistrictPlanId.class)
public class DistrictPlan {
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Id
    @Column(name = "state_id", nullable = false)
    private StateCode stateId;

    // Change to simplified date
    @Column(name="date")
    private Date date;

    @Column(name="status")
    private Status status;

    @Column(name="proposed_by")
    private String proposedBy;

    @Transient
    @OneToMany
    private Set<District> districts;

    @Transient
    private int[] seats;

    @Transient
    private int[] votes;

    // Recently added measures
    // @Transient is temporary for now
    @Transient
    private double populationEquality;
    @Transient
    private double compactness;
    @Transient
    private double splitCounty;
    @Transient
    private int majorityMinorityCount;
    @Transient
    private int competitiveDistrictCount;
    @Transient
    private double meanMedianDiff;
    @Transient
    private double efficiencyGap;
//    @Transient
//    @OneToOne
//    private Measures measures;
}
