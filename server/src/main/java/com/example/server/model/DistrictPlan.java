package com.example.server.model;

import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.enumeration.Status;

import com.example.server.model.id.DistrictPlanId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;
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
    private String planId;

    @Column(name="date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    @Column(name="status")
    private Status status;

    @Column(name="proposed_by")
    private String proposedBy;

    // demographic
    @Column(name="total_pop", columnDefinition = "integer default 10")
    private Integer totalPop;

    @Column(name="white", columnDefinition = "integer default 10")
    private Integer white;

    @Column(name="hispanic", columnDefinition = "integer default 10")
    private int hispanic;

    @Column(name="af_amer", columnDefinition = "integer default 10")
    private int africanAmerican;

    @Column(name="asian", columnDefinition = "integer default 10")
    private int asian;

    @Column(name="native_hawaiian", columnDefinition = "integer default 10")
    private int nativeHawaiian;

    @Column(name="two_or_more", columnDefinition = "integer default 10")
    private int twoOrMore;

    @Transient
    @MapKeyEnumerated(EnumType.STRING)
    private Map<Category, Integer> demographic;

    // political demographic
    @Column(name="democratic_pres", columnDefinition = "integer default 10")
    private int democraticPres;

    @Column(name="republican_pres", columnDefinition = "integer default 10")
    private int republicanPres;

    @Column(name="democratic_sen", columnDefinition = "integer default 10")
    private int democraticSen;

    @Column(name="republican_sen", columnDefinition = "integer default 10")
    private int republicanSen;

    // vote-split
    @Column(name="vote_split_democrats_pres", columnDefinition = "integer default 10")
    private int voteSplitDemoPres;

    @Column(name="vote_split_republicans_pres", columnDefinition = "integer default 10")
    private int voteSplitRepubPres;

    @Column(name="vote_split_democrats_sen", columnDefinition = "integer default 10")
    private int voteSplitDemoSen;

    @Column(name="vote_split_republicans_sen", columnDefinition = "integer default 10")
    private int voteSplitRepubSen;

    // measures
    @Column(name="polsby_popper", columnDefinition = "double default 10.0")
    private double polsbyPopper;    // compactness

    @Column(name="efficiency_gap", columnDefinition = "double default 10.0")
    private double efficiencyGap;

    // not used in production
    @Column(name="mean_median_diff", columnDefinition = "double default 10.0")
    private double meanMedianDiff;

    @Column(name="population_equality", columnDefinition = "double default 10.0")
    private double populationEquality;

    @Column(name="split_county", columnDefinition = "double default 10.0")
    private double splitCounty;

    @Column(name="num_majority_minority_districts", columnDefinition = "integer default 10")
    private int numMajorityMinorityDistricts;

    @Column(name="competitive_district_count", columnDefinition = "integer default 10")
    private int competitiveDistrictCount;

    @Column(name="political_fairness", columnDefinition = "double default 10.0")
    private double politicalFairness;

    @Column(name="geometry")
    private JSONObject geometry;

    @Transient
    @OneToMany
    private Set<District> districts;
}

/*
[done]
'districtPlanId',
'stateId',
'proposedBy',

[missing in JSON]
date
status

[done]
"polsby_popper",
"efficiency_gap",
"num_majority_minority_districts",

[missing in JSON]
population_equality
split_county
num_majority_minority_districts
competitive_district_count
political_fairness

[done]
"total_pop",
"white",
"af_amer",
"asian",
"hispanic",
"native_hawaiian",
"two_or_more",
"democraticPres",
"democraticSen",
"republicanPres",
"republicanSen",
"vote_split_democrats_pres",
"vote_split_republicans_pres",
"vote_split_democrats_sen",
"vote_split_republicans_sen"
 */