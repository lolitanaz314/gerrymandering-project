package com.example.server.id;

import com.example.server.enumeration.RacialCategory;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
public class DemographicId implements Serializable {
    private int id;
    private RacialCategory race;
}
