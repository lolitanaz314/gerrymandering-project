package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.id.DistrictPlanId;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "seat_vote_curve_measures")
@IdClass(DistrictPlanId.class)
public class SeatVoteCurveMeasures {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @Column(name="state_id", nullable = false)
    private String stateId;

    @Column(name="district_plan_id", nullable = false)
    private String planId;

    @Column(name = "election_type")
    private String electionType;

    @Column(name = "symmetry_gini_score")
    private String symmetryGiniScore;

    @Column(name = "partisan_bias")
    private String partisanBias;

    @Column(name = "mean_median_score")
    private String meanMedianScore;

//    @Column(name = "vote_bias", columnDefinition = "double default 10.0")
//    double voteBias;
//
//    @Column(name = "seat_bias", columnDefinition = "double default 10.0")
//    double seatBias;

    @Transient
    List<SeatVoteCurvePoints> seatVotePoints;
}
