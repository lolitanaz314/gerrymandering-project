// EDITING needed
package com.example.server.model;

import com.example.server.enumeration.RacialCategory;
import com.example.server.enumeration.StateCode;
import com.example.server.id.DemographicId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity // These tells Hibernate to make a table out of this class
@Table(name = "demographic")
@IdClass(DemographicId.class)
public class Demographic {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Column(name="district_plan_id", nullable = true)
    private Integer districtPlanId;

    @Column(name="district_id", nullable = true)
    private Integer districtId;

    @Column(name="precinct_id", nullable = true)
    private Integer precinctId;

    @Id
    @Column(name="race", nullable = false)
    private RacialCategory race;

    @Column(name = "total_pop", nullable = false) // total population
    private int totalPop;

//    @Id
//    //@Column(name="id")
//    private int id;
//
//    // temporary
//    //@Column(name="race")
//    private RacialCategory race;
//
//    // temporary
//    //@Column(name = "total_pop") // total population
//    private int totalPop;

//    @MapKeyEnumerated(EnumType.STRING)
//    @Transient
//    private Map<RacialCategory, Integer> populations; // basically a dictionary
}