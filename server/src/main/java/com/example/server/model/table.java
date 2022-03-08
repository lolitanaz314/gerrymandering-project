package com.example.server.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="table")
@Data

public class table {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long number;
    private String first;
    private String last;
    private String username;
}
