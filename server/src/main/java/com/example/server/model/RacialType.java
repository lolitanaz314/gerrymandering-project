package com.example.server.model;

public enum RacialType {
    WHITE(0),
    AFRICAN_AMERICAN(1),
    ASIAN(2),
    HISPANIC(3)
    ;

    private final int value;

    RacialType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
