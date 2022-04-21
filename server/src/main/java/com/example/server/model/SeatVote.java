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
    @Column(name = "id", nullable = false)
    private int id;

    @Id
    @Column(name = "state_id", nullable = false)
    private StateCode stateId;

    @Column(name = "vote_bias")
    double voteBias;

    @Column(name = "seat_bias")
    double seatBias;

    @Transient
    double[][] curve;
}
