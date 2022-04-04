package com.example.server.embeddedId;

import com.example.server.model.StateCode;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class DistrictId implements Serializable {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable = false)
    private int id;

    @Column(name="district_plan_id", nullable = false)
    private int districtPlanId;

    @Column(name="state_name", nullable = false)
    private StateCode stateName;
}