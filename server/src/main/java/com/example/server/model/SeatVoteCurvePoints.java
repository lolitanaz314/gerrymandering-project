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
    private StateCode stateId;

//    @Column(name="district_plan_id", nullable = false)
//    private int planId;

    @Column(name = "votes")
    double voteBias;

    @Column(name = "seats_republican")
    double seatRepublican;

    @Column(name = "seats_democratic")
    double seatDemocratic;
}
