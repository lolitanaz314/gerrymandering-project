package com.example.server.model;

import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

import com.example.server.embeddedId.DistrictPlanId;
import lombok.*;


import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district_plan")
public class DistrictPlan {
    @EmbeddedId
    private DistrictPlanId districtPlanId;

    //@Column(name="date")
    private Date date;

    //@Column(name="status")
    private Status status;

    //@Column(name="proposed_by")
    private String proposedBy;

    @OneToOne
    private Measures measures;

    @Transient
    @OneToMany
    private Set<District> districts;

    // borderData: JSON
}

