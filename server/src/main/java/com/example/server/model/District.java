package com.example.server.model;

import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;

import com.example.server.model.id.DistrictId;
import lombok.*;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district")
@IdClass(DistrictId.class)
public class District {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private String planId;

    @Id
    @Column(name="district_id", nullable = false)
    private int districtId;

    @Transient private StateCode dupStateId;
    @Transient private String dupPlanId;
    @Transient int dupDistrictId;

//    @ManyToOne
//    private DistrictPlan districtPlan;

    // Instead of using a tuple, we can use [-60 to 60 to represent R+60 to D+60]
//    @Column(name="lean", columnDefinition = "int default 10")
//    private int lean;

    // not used in production
    @Column(name="incumbent", columnDefinition = "varchar(255) default ''")
    private String incumbent;

    // demographic
    @Column(name="total_pop")
    private int totalPop;

    @Column(name="white")
    private int white;

    @Column(name="hispanic")
    private int hispanic;

    @Column(name="af_amer")
    private int africanAmerican;

    @Column(name="asian")
    private int asian;

    @Column(name="native_hawaiian")
    private int nativeHawaiian;

    @Column(name="two_or_more")
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

    // political demographic percentage
    @Column(name="democratic_pres_perc", columnDefinition = "double default .5")
    private double democraticPresPerc;

    @Column(name="republican_pres_perc", columnDefinition = "double default .5")
    private double republicanPresPerc;

    @Column(name="democratic_sen_perc", columnDefinition = "double default .5")
    private double democraticSenPerc;

    @Column(name="republican_sen_perc", columnDefinition = "double default .5")
    private double republicanSenPerc;

    // measures
    @Column(name="polsby_popper", columnDefinition = "double default 1.0")
    private double polsbyPopper;    // compactness

    // geometry
//    @Column(name="geometry")
//    private JSONObject geometry;

//    @Transient
//    @OneToMany
//    private Set<Precinct> precincts;
}
