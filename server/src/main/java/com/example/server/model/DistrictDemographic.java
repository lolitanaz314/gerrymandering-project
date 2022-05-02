package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.id.DistrictId;
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
@Table(name = "district_demographic")
@IdClass(DistrictId.class)
public class DistrictDemographic {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int planId;

    @Id
    @Column(name="district_id", nullable = false)
    private int districtId;

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
}