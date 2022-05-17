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
@Table(name = "seat_vote_curve_points")
public class SeatVoteCurvePoints {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @Column(name="state_id")
    private String stateId;

    @Column(name="district_plan_id", nullable = false)
    private String planId;

    @Column(name="district_id", nullable = false)
    private String districtId;

    @Column(name = "dem_Pres")
    private String demPres;

    @Column(name = "rep_Pres")
    private String repPres;

    @Column(name = "dem_Sen")
    private String demSen;

    @Column(name = "rep_Sen")
    private String repSen;

//    @Column(name = "votes")
//    double voteBias;
//
//    @Column(name = "seats_republican")
//    double seatRepublican;
//
//    @Column(name = "seats_democratic")
//    double seatDemocratic;
}
