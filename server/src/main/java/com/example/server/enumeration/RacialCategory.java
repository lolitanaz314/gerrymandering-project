package com.example.server.enumeration;

public enum RacialCategory {
    WHITE(0),
    HISPANIC(1),
    BLACK(2),
    ASIAN(3),
    NATIVE(4),
    PACIFIC(5),
    MIX(6);

    private final int value;

    RacialCategory(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
