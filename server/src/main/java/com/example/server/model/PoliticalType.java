package com.example.server.model;

public enum PoliticalType {
    DEMOCRATIC_PARTY(0),
    REPUBLICAN_PARTY(1);

    private final int value;

    PoliticalType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
