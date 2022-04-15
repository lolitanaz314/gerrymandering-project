package com.example.server.model;

import com.example.server.enumeration.StateCode;
import com.example.server.enumeration.Status;

import com.example.server.id.DistrictPlanId;
import lombok.*;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district_plan")
@IdClass(DistrictPlanId.class)
public class DistrictPlan {
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Id
    @Column(name = "state_id", nullable = false)
    private StateCode stateId;

    @Column(name="date")
    private Date date;

    @Column(name="status")
    private Status status;

    @Column(name="proposed_by")
    private String proposedBy;

    @Transient
    @OneToMany
    private Set<District> districts;

    @Transient
    private int[] seats;

    @Transient
    private int[] votes;

    @Transient
    @OneToOne
    private Measures measures;
}
