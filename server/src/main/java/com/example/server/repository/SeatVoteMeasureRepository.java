package com.example.server.repository;

import com.example.server.model.SeatVoteCurveMeasures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SeatVoteMeasureRepository extends JpaRepository<SeatVoteCurveMeasures, Integer> {
    @Query(value = "SELECT * FROM seat_vote_curve_measures WHERE election_type = 'Presidential' AND " +
            "state_id = ?1 AND district_plan_id = '?2'", nativeQuery = true)
    Optional<SeatVoteCurveMeasures> findMeasures(int state_id, String district_plan_id);
}