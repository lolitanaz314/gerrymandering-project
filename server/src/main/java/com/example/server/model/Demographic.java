package com.example.server.model;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "demographic")
public class Demographic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Integer id;

    @Column(name = "race")
    private String race;

    @Column(name = "population")
    private Integer population;
}