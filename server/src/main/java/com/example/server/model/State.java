package com.example.server.model;

import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;

import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "test_state")
public class State {
    @Id
    @Column(name="state_id")
    private StateCode stateId;

    @Transient
    @OneToMany
    private List<DistrictPlan> districtPlans;
}
