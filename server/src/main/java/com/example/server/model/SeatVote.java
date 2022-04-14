package com.example.server.model;

import com.example.server.enumeration.StateCode;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@With
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
