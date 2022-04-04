package com.example.server.embeddedId;

import com.example.server.model.StateCode;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class PrecinctId implements Serializable {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="state_name")
    private StateCode stateName;
}