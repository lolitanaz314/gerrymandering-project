package com.example.server.repository; // 3) Create the Repository

import com.example.server.model.user;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface userRepository extends CrudRepository<user, Integer> {

}