package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
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
@Table(name = "state_demographic")
public class StateDemographic {
    @Id
    @Column(name="state_id")
    private StateCode stateId;

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