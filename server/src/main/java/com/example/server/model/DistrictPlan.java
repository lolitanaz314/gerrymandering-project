package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.enumeration.Status;

import com.example.server.model.id.DistrictPlanId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import net.minidev.json.JSONObject;

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
//    @ManyToOne
//    private State state;

    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int planId;

    @Column(name="date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    @Column(name="status")
    private Status status;

    @Column(name="proposed_by")
    private String proposedBy;

    // measures
    @Column(name="polsby_popper", columnDefinition = "double default 10.0")
    private double polsbyPopper;    // compactness

    @Column(name="efficiency_gap", columnDefinition = "double default 10.0")
    private double efficiencyGap;

    @Column(name="meanMedian_diff", columnDefinition = "double default 10.0")
    private double meanMedianDiff;

    @Column(name="population_equality", columnDefinition = "double default 10.0")
    private double populationEquality;

    @Column(name="splitCounty", columnDefinition = "double default 10.0")
    private double splitCounty;

    @Column(name="num_majority_minority_districts", columnDefinition = "integer default 10")
    private int numMajorityMinorityDistricts;

    @Column(name="competitive_district_count", columnDefinition = "integer default 10")
    private int competitiveDistrictCount;

    // vote-split
    @Column(name="vote_split_democrats_pres", columnDefinition = "integer default 10")
    private int voteSplitDemoPres;

    @Column(name="vote_split_republicans_pres", columnDefinition = "integer default 10")
    private int voteSplitRepubPres;

    @Column(name="vote_split_democrats_sen", columnDefinition = "integer default 10")
    private int voteSplitDemoSen;

    @Column(name="vote_split_republicans_sen", columnDefinition = "integer default 10")
    private int voteSplitRepubSen;

//    @Column(name="geometry")
//    private JSONObject geometry;

    @Transient
    @OneToMany
    private Set<District> districts;
}
