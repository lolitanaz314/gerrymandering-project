package com.example.server.model;

import javax.persistence.*;
import lombok.*;

import javax.persistence.MapKeyEnumerated;
import java.util.Map;

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

    @MapKeyEnumerated
    private Map<RacialCategory, Integer> populations; // basically a dictionary

}