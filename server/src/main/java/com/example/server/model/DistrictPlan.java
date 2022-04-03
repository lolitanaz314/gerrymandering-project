package com.example.server.model;

import java.util.Collection;
import java.util.Date;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district_plan")
public class DistrictPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="status")
    private String status;

    @Column(name="proposedBy")
    private String proposedBy;

    @Column(name="date")
    private Date date;

    @Column(name="totalPopulation")
    private int totalPopulation;

    // private Collection<Tuple> population;
    // private Collection<District> districts;
}