package com.example.server.embeddedId;

import com.example.server.model.StateCode;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class DistrictPlanId implements Serializable {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable = false)
    private int id;

    @Column(name = "state_name", nullable = false)
    private StateCode stateName;
}