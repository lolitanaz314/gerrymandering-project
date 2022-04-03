package com.example.server.model;

import java.util.Collection;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Transient
    @Column(name = "lean")
    private Tuple lean;

    @Column(name = "incumbent")
    private String incumbent;

    @Column(name = "totalPopulation")
    private int totalPopulation;

    // private Collection<Tuple> population;
}
