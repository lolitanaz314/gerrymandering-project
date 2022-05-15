package com.example.server.model;

import com.example.server.model.enumeration.Category;
import com.example.server.model.enumeration.StateCode;
import lombok.*;
import javax.persistence.*;

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
    private Category demographic;

    @Column(name="state_id")
    private StateCode stateId;

    @Column(name="district_id")
    private Integer districtId;

    @Column(name="min")
    private Double min;

    @Column(name="q1")
    private Double q1;

    @Column(name="med")
    private Double med;

    @Column(name="q3")
    private Double q3;

    @Column(name="max")
    private Double max;
}
