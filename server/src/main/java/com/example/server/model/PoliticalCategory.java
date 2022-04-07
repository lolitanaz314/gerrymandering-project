package com.example.server.model;

public enum PoliticalCategory {
    DEMOCRATIC_PARTY(0),
    REPUBLICAN_PARTY(1);

    private final int value;

    PoliticalCategory(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}