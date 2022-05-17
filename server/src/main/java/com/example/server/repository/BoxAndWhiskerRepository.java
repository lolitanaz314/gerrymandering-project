package com.example.server.repository;

import com.example.server.model.BoxAndWhiskerData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoxAndWhiskerRepository extends JpaRepository<BoxAndWhiskerData, Integer>{
    // get points of chosen demographic in state
    @Query(value = "SELECT * " +
            "FROM box_and_whisker_data " +
            "WHERE demographic = ?1 AND state_id = ?2", nativeQuery = true)
    List<BoxAndWhiskerData> findPoints(String demographic, String state_id);
}
