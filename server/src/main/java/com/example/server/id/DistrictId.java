package com.example.server.id;

import com.example.server.model.enumeration.StateCode;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class DistrictId implements Serializable {
    private int id;
    private int districtPlanId;
    private StateCode stateId;
}
