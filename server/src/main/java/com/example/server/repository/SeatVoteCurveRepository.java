package com.example.server.repository;

import com.example.server.model.SeatVoteCurveMeasures;
import com.example.server.model.SeatVoteCurvePoints;
import com.example.server.model.enumeration.StateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatVoteCurveRepository extends JpaRepository<SeatVoteCurveMeasures, Integer> {

    @Query(value = "SELECT * FROM seat_vote_curve_measures;", nativeQuery = true)
    Optional<SeatVoteCurveMeasures> findMeasures(StateCode stateId, String planId);

    @Query(value = "SELECT * FROM seat_vote_curve_points;", nativeQuery = true)
    List<SeatVoteCurvePoints> findPoints(StateCode stateId, String planId);
}