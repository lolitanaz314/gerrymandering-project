package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.id.DistrictPlanId;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "seat_vote_curve")
@IdClass(DistrictPlanId.class)
public class SeatVoteCurve {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int planId;

    @Column(name = "vote_bias")
    double voteBias;

    @Column(name = "seat_bias")
    double seatBias;

    @Transient
    List<SeatVoteData> seatVotePoints;
}
