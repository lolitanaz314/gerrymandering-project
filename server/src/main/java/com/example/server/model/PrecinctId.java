package com.example.server.model;

import com.example.server.enumeration.StateCode;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class PrecinctId implements Serializable {
    private int id;
    private StateCode stateId;
}
