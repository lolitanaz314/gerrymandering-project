package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.server.model.table;
@Repository
public interface tableRepository extends JpaRepository <table, Long> {

}
