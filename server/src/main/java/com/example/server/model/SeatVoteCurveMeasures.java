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
@Table(name = "seat_vote_curve_values")
@IdClass(DistrictPlanId.class)
public class SeatVoteCurveValues {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int planId;

    @Column(name = "vote_bias", columnDefinition = "double default 10.0")
    double voteBias;

    @Column(name = "seat_bias", columnDefinition = "double default 10.0")
    double seatBias;

    @Transient
    List<SeatVoteCurvePoints> seatVotePoints;
}
