package com.example.server.model;

public enum MeasureType {
    POLSBY_POPPER(0),
    SPLIT_COUNTIES_SCORE(1),
    NUM_SPLIT_COUNTIES(2),
    VOTE_SEAT_SHARE(3),
    POLITICAL_FAIRNESS(4),
    DEVIATION_FROM_ENACTED_DISTRICTING(5);

    private final int value;

    MeasureType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
