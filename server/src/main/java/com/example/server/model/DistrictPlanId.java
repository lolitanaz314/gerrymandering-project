package com.example.server.model;

import com.example.server.enumeration.StateCode;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class DistrictPlanId implements Serializable {
    private StateCode stateId;
    private int id;

//    public DistrictPlanId(StateCode stateId, long id){
//        this.stateId = stateId;
//        this.id = id;
//    }
}
