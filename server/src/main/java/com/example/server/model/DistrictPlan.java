package com.example.server.model;

import com.example.server.enumeration.StateCode;
import com.example.server.enumeration.Status;
import com.example.server.enumeration.Measures;

import lombok.*;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
// @RequiredArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "district_plan")
@IdClass(DistrictPlanId.class)
public class DistrictPlan {
    @Id
    @Column(name = "state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name="date")
    private Date date;

    @Column(name="status")
    private Status status;

    @Column(name="proposed_by")
    private String proposedBy;

//    @Transient
//    @OneToMany
//    @Column(name="districts")
//    private Set<District> districts;

    @Transient
    // @Column(name="votes")
    private int[] votes;

    @Transient
    @OneToOne
    // @Column(name="measures")
    private Measures measures;

//    public long getId() {
//        return id;
//    }
//
//    public StateCode getStateId() {
//        return stateId;
//    }
}
