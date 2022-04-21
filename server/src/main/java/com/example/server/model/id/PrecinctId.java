package com.example.server.model.id;

import com.example.server.model.enumeration.StateCode;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class PrecinctId implements Serializable {
    private StateCode stateId;
    private int precinctId;
}
