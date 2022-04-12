// EDITING needed
package com.example.server.model;

import com.example.server.enumeration.RacialCategory;
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
public class Demographic {
    @Id
    //@Column(name="id")
    private int id;

    // temporary
    //@Column(name="race")
    private RacialCategory race;

    // temporary
    //@Column(name = "total_pop") // total population
    private int totalPop;

//    @MapKeyEnumerated(EnumType.STRING)
//    @Transient
//    private Map<RacialCategory, Integer> populations; // basically a dictionary

}