package com.example.server.model;

import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.id.PrecinctId;
import lombok.*;

import javax.persistence.*;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "precinct")
@IdClass(PrecinctId.class)
public class Precinct {
    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Id
    @Column(name="precinct_id", nullable = false)
    private int precinctId;

//    @ManyToOne
//    private State state;

    @Column(name="total_pop") // total population
    private int totalPop;

    @Transient
    @MapKeyEnumerated(EnumType.STRING)
    private Map<RacialCategory, Integer> demographic;

    @Transient
    private Set<Precinct> precinctNeighbors;
}
