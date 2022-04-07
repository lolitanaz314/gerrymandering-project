package com.example.server.model;

public enum RacialCategory {
    WHITE(0),
    AFRICAN_AMERICAN(1),
    ASIAN(2),
    HISPANIC(3)
    ;

    private final int value;

    RacialCategory(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
