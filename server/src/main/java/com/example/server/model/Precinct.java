package com.example.server.model;

import com.example.server.enumeration.StateCode;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "precinct")
@IdClass(PrecinctId.class)
public class Precinct {
    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Column(name = "total_pop") // total population
    private int totalPop;

    @Transient
    private int[] demographic;

    @Transient
    private Set<Precinct> precinctNeighbors;
}
