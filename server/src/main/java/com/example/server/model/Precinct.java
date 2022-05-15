package com.example.server.model;

import com.example.server.model.enumeration.Category;
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

    // demographic
    @Column(name="total_pop")
    private int totalPop;

    @Column(name="white")
    private int white;

    @Column(name="hispanic")
    private int hispanic;

    @Column(name="af_amer")
    private int africanAmerican;

    @Column(name="asian")
    private int asian;

    @Column(name="native_hawaiian")
    private int nativeHawaiian;

    @Column(name="two_or_more")
    private int twoOrMore;

    @Transient
    @MapKeyEnumerated(EnumType.STRING)
    private Map<Category, Integer> demographic;

    @Transient
    private Set<Precinct> precinctNeighbors;
}
