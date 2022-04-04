package com.example.server.model;

import java.util.List;
import javax.persistence.*;

import com.example.server.embeddedId.DistrictId;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district")
public class District {
    @EmbeddedId
    private DistrictId districtPlanId;

    @Column(name = "incumbent")
    private String incumbent;

    @Transient
    @Column(name = "lean")
    private Tuple lean;

    @Column(name = "total_population")
    private int totalPopulation;

    @Transient
    @Column(name = "demographic")
    private List<Tuple> demographic;

    @Transient
    private List<Precinct> precincts;
}
