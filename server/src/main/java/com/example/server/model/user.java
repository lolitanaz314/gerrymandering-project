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
@Table(name = "user")
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    // @Column(name = "first")
    private String first;

    // @Column(name = "last")
    private String last;

    // @Column(name = "username")
    private String username;
}