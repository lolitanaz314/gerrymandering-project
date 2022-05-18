package com.example.server.repository;

import com.example.server.model.SeatVoteCurvePoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatVotePointsRepository extends JpaRepository<SeatVoteCurvePoints, Integer> {
    @Query(value = "SELECT * FROM seat_vote_curve_points " +
            "WHERE state_id = ?1 AND district_plan_id = ?2", nativeQuery = true)
    List<SeatVoteCurvePoints> findPoints(int state_id, String district_plan_id);
}