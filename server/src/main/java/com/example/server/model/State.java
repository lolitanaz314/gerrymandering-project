package com.example.server.model;

import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;

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
    @Column(name="state_id")
    private StateCode stateId;

    // demographic
    @Column(name="total_pop", columnDefinition = "integer default 10")
    private int totalPop;

    @Column(name="white", columnDefinition = "integer default 10")
    private int white;

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

    @Transient
    @OneToMany
    private List<DistrictPlan> districtPlans;
}
