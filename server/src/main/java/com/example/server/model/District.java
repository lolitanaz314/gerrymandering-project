package com.example.server.model;

import com.example.server.enumeration.RacialCategory;
import com.example.server.enumeration.StateCode;

import com.example.server.id.DistrictId;
import lombok.*;
import javax.persistence.*;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district")
@IdClass(DistrictId.class)
public class District {
    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int districtPlanId;

    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Column(name = "incumbent")
    private String incumbent;

    // this will stay non-transient
    // @Column(name = "total_pop") // total population
    @Transient
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
}
