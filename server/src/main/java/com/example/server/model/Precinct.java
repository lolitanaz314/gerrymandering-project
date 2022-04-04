package com.example.server.model;

import java.util.Collection;
import java.util.List;
import javax.persistence.*;

import com.example.server.embeddedId.PrecinctId;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "precinct")
public class Precinct {
    @EmbeddedId
    private PrecinctId precinctId;

    @Column(name = "total_population")
    private int totalPopulation;

    @Transient
    @Column(name = "demographic")
    private List<Tuple> demographic;

    @Transient
    private Collection<Precinct> precinctNeighbors;
}