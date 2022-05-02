package com.example.server.repository;

import com.example.server.model.BoxAndWhiskerData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoxAndWhiskerRepository extends JpaRepository<BoxAndWhiskerData, Integer>{
    // get points of chosen demographic in state
    @Query(value = "SELECT percent FROM box_and_whisker_data " +
            "WHERE demographic = ?1 AND state_id = ?2 AND district_id = ?3", nativeQuery = true)
    List<Double> findPoints(int demographic, int state_id, int district_id);
}
