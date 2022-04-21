package com.example.server.model;

import com.example.server.model.enumeration.StateCode;
import com.example.server.model.id.DistrictPlanId;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "seat_vote")
@IdClass(DistrictPlanId.class)
public class SeatVote {
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
    double[][] curve;
}
