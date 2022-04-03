package com.example.server.model;

import java.util.Collection;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "precinct")
public class Precinct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;
    // private State state; // This needs to change to ENUM
    // private District district;

    @Column(name = "totalPopulation")
    private int totalPopulation;

    // private Collection<Precinct> precinctNeighbors;

    // private Collection<Tuple> population;
}