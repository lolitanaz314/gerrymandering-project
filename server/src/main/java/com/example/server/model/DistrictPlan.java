package com.example.server.model;

import java.util.Date;
import java.util.List;
import javax.persistence.*;

import com.example.server.embeddedId.DistrictPlanId;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district_plan")
public class DistrictPlan {
    @EmbeddedId
    private DistrictPlanId districtPlanId;

    @Column(name="date")
    private Date date;

    @Column(name="status")
    private Status status;

    @Column(name="proposed_by")
    private String proposedBy;

    @Transient
    private List<District> districts;

    // borderData: JSON
}

