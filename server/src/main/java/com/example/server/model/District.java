package com.example.server.model;

import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;

import com.example.server.model.id.DistrictId;
import lombok.*;
import javax.persistence.*;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "District")
@IdClass(DistrictId.class)
public class District {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int planId;

    @Id
    @Column(name="district_id", nullable = false)
    private int districtId;

    @Column(name="incumbent")
    private String incumbent;

    @Column(name="total_pop") // total population
    private int totalPop;

    @Transient
    @MapKeyEnumerated(EnumType.STRING)
    private Map<RacialCategory, Integer> demographic;

    @Transient
    private Tuple lean;

    @Transient
    private int[] seats;

    @Transient
    private int[] votes;

    @Transient
    private Set<Precinct> precincts;

    // Recently added measures
    // @Transient is temporary for everything below
    @Transient
    private double compactness;
}
