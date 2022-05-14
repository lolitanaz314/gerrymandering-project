package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.id.PrecinctId;
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
@Table(name = "demographic_precinct")
@IdClass(PrecinctId.class)
public class DemographicPrecinct {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="precinct_id", nullable = false)
    private int precinctId;

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