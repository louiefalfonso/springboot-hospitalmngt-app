package com.hospitalspring.app.repository;

import com.hospitalspring.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public class UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
