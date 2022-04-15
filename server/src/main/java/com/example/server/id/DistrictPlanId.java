package com.example.server.id;

import com.example.server.enumeration.StateCode;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class DistrictPlanId implements Serializable {
    private int id;
    private StateCode stateId;
}
