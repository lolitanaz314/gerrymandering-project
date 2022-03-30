package com.example.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Table;

import lombok.*;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

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