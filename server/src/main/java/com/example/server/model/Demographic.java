package com.example.server.model;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity // These tells Hibernate to make a table out of this class
@Table(name = "demographic")
public class Demographic {
    @Id
    @Column(name="id")
    private Integer id;

    @Column(name = "race")
    private String race;

    @Column(name = "population")
    private Integer population;
}