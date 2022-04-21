package com.example.server.model.id;

import com.example.server.model.enumeration.StateCode;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class DistrictPlanId implements Serializable {
    private StateCode stateId;
    private int planId;
}
