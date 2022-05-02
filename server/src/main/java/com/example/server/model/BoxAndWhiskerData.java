package com.example.server.model;

import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;
import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "box_and_whisker_data")
public class BoxAndWhiskerData {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @Column(name="demographic")
    private RacialCategory race;

    @Column(name="state_id")
    private StateCode stateId;

    @Column(name="district_id")
    private Integer districtId;

    @Column(name="percent")
    private Double percent;
}
